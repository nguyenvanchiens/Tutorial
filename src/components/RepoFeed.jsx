import { useState, useEffect, useCallback, useRef } from 'react'

const POLL_INTERVAL_MS = 5 * 60 * 1000
const STORAGE_LIKED = 'devhub-liked-repos'
const STORAGE_CACHE = 'devhub-repo-feed-cache'
const STORAGE_TR_PREFIX = 'devhub-repo-vi-'
const PER_PAGE = 15

// Dịch mô tả repo sang tiếng Việt — Google Translate public endpoint (free, không cần key).
// Mô tả repo ngắn (< 350 ký tự) nên không cần chia chunk.
const GTRANSLATE_URL = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t'
async function translateToVi(text) {
  if (!text || !text.trim()) return ''
  const res = await fetch(`${GTRANSLATE_URL}&q=${encodeURIComponent(text)}`)
  if (!res.ok) throw new Error(`Translate ${res.status}`)
  const data = await res.json()
  return (data?.[0] || []).map(row => row?.[0] || '').join('')
}

// CHỈ lấy repo đúng 3 chủ đề: .NET Core, ReactJS, AI/LLM.
// Mỗi chủ đề 1 query riêng (GitHub Search không OR tốt giữa các qualifier),
// rồi gộp + khử trùng lặp.
const CATEGORIES = [
  { key: 'dotnet', label: '.NET Core', q: 'language:C# stars:>1000', color: '#178600' },
  { key: 'react',  label: 'ReactJS',   q: 'topic:react stars:>1000', color: '#3178c6' },
  { key: 'ai',     label: 'AI / LLM',  q: 'topic:llm stars:>1000',   color: '#fa709a' },
]

// GitHub Search API — public, không cần key (~10 req/phút mỗi IP).
function buildSearchUrl(catQuery) {
  const since = new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
  const d = since.toISOString().slice(0, 10) // YYYY-MM-DD
  const q = `${catQuery} pushed:>${d}`
  return `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=updated&order=desc&per_page=${PER_PAGE}`
}

function formatStars(n) {
  if (n == null) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return `${n}`
}

function formatAgo(iso) {
  if (!iso) return ''
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 60) return `${s}s trước`
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`
  return `${Math.floor(s / 86400)} ngày trước`
}

function formatUpdatedLabel(date) {
  if (!date) return 'Chưa tải'
  const s = Math.floor((Date.now() - date.getTime()) / 1000)
  if (s < 60) return `Cập nhật: ${s}s trước`
  return `Cập nhật: ${Math.floor(s / 60)} phút trước`
}

// Lưu gọn repo để khỏi phình localStorage. Gắn kèm chủ đề (category).
function slimRepo(r, category) {
  return {
    id: r.id,
    category: category || r.category,
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description,
    language: r.language,
    stargazers_count: r.stargazers_count,
    forks_count: r.forks_count,
    pushed_at: r.pushed_at,
    topics: (r.topics || []).slice(0, 4),
    owner_avatar: r.owner_avatar || r.owner?.avatar_url || '',
  }
}

const CAT_LABEL = Object.fromEntries(CATEGORIES.map(c => [c.key, c.label]))
const CAT_COLOR = Object.fromEntries(CATEGORIES.map(c => [c.key, c.color]))

const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Go: '#00ADD8',
  Rust: '#dea584', Java: '#b07219', 'C#': '#178600', 'C++': '#f34b7d', C: '#555555',
  Ruby: '#701516', PHP: '#4F5D95', Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB',
  Shell: '#89e051', HTML: '#e34c26', CSS: '#563d7c', Vue: '#41b883', Lua: '#000080',
}

export default function RepoFeed() {
  const [repos, setRepos] = useState(() => {
    try {
      const c = localStorage.getItem(STORAGE_CACHE)
      return c ? JSON.parse(c) : []
    } catch { return [] }
  })
  const [liked, setLiked] = useState(() => {
    try {
      const c = localStorage.getItem(STORAGE_LIKED)
      return c ? JSON.parse(c) : []
    } catch { return [] }
  })
  const [view, setView] = useState('feed')   // 'feed' | 'liked'
  const [cat, setCat] = useState('all')       // 'all' | 'dotnet' | 'react' | 'ai'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [, forceTick] = useState(0)
  const abortRef = useRef(null)

  // Bản dịch tiếng Việt theo repo id: { [id]: { text?, loading?, error?, show? } }
  const [translations, setTranslations] = useState(() => {
    try {
      const acc = {}
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k && k.startsWith(STORAGE_TR_PREFIX)) {
          acc[k.slice(STORAGE_TR_PREFIX.length)] = { text: localStorage.getItem(k), show: false }
        }
      }
      return acc
    } catch { return {} }
  })

  const toggleTranslate = useCallback(async (repo) => {
    const id = repo.id
    const ex = translations[id]
    if (ex?.text) { // đã có bản dịch → chỉ bật/tắt hiển thị
      setTranslations(t => ({ ...t, [id]: { ...t[id], show: !t[id].show } }))
      return
    }
    if (ex?.loading || !repo.description) return
    setTranslations(t => ({ ...t, [id]: { loading: true, show: true } }))
    try {
      const vi = await translateToVi(repo.description)
      try { localStorage.setItem(STORAGE_TR_PREFIX + id, vi) } catch { /* quota */ }
      setTranslations(t => ({ ...t, [id]: { text: vi, show: true } }))
    } catch (e) {
      setTranslations(t => ({ ...t, [id]: { error: e.message || 'Lỗi dịch', show: true } }))
    }
  }, [translations])

  const fetchRepos = useCallback(async () => {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setLoading(true)
    setError(null)
    try {
      const settled = await Promise.allSettled(
        CATEGORIES.map(async (c) => {
          const res = await fetch(buildSearchUrl(c.q), {
            signal: ctrl.signal,
            headers: { Accept: 'application/vnd.github+json' },
          })
          if (!res.ok) throw new Error(`GitHub API ${res.status}`)
          const data = await res.json()
          return (data.items || []).map(r => slimRepo(r, c.key))
        })
      )

      if (ctrl.signal.aborted) return // request bị thay thế — bỏ qua, không báo lỗi

      const ok = settled.filter(s => s.status === 'fulfilled').flatMap(s => s.value)
      if (ok.length === 0) {
        const firstErr = settled.find(s => s.status === 'rejected')
        throw new Error(firstErr?.reason?.message || 'Không tải được dữ liệu')
      }

      // Gộp + khử trùng lặp theo id, rồi sắp theo mới-push-nhất.
      const byId = new Map()
      ok.forEach(r => { if (!byId.has(r.id)) byId.set(r.id, r) })
      const merged = [...byId.values()]
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))

      setRepos(merged)
      setLastUpdated(new Date())
      try { localStorage.setItem(STORAGE_CACHE, JSON.stringify(merged)) } catch { /* quota */ }
    } catch (e) {
      if (e.name !== 'AbortError' && !ctrl.signal.aborted) setError(e.message || 'Unknown error')
    } finally {
      if (abortRef.current === ctrl) setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRepos()
    const timer = setInterval(fetchRepos, POLL_INTERVAL_MS)
    return () => { clearInterval(timer); abortRef.current?.abort() }
  }, [fetchRepos])

  useEffect(() => {
    const t = setInterval(() => forceTick(v => v + 1), 30_000)
    return () => clearInterval(t)
  }, [])

  const likedIds = new Set(liked.map(r => r.id))

  const toggleLike = useCallback((repo) => {
    setLiked(prev => {
      const exists = prev.some(r => r.id === repo.id)
      const next = exists ? prev.filter(r => r.id !== repo.id) : [slimRepo(repo), ...prev]
      try { localStorage.setItem(STORAGE_LIKED, JSON.stringify(next)) } catch { /* quota */ }
      return next
    })
  }, [])

  const base = view === 'liked' ? liked : repos
  const list = cat === 'all' ? base : base.filter(r => r.category === cat)

  return (
    <div className="claude-news">
      <div className="claude-news-header">
        <div>
          <h1>Repo Đáng Chú Ý</h1>
          <p className="claude-news-subtitle">
            Chỉ <code>.NET Core</code> · <code>ReactJS</code> · <code>AI/LLM</code> · Tự refresh mỗi 5 phút · Bấm ❤ để lưu
          </p>
        </div>
        <div className="claude-news-actions">
          <span className="claude-news-status">
            {loading ? 'Đang tải...' : formatUpdatedLabel(lastUpdated)}
          </span>
          <button className="claude-btn" onClick={fetchRepos} disabled={loading}>
            {loading ? '...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="repo-tabs">
        <button
          className={`repo-tab ${view === 'feed' ? 'active' : ''}`}
          onClick={() => setView('feed')}
        >
          Khám phá {repos.length > 0 && <span className="repo-tab-count">{repos.length}</span>}
        </button>
        <button
          className={`repo-tab ${view === 'liked' ? 'active' : ''}`}
          onClick={() => setView('liked')}
        >
          ❤ Đã thích {liked.length > 0 && <span className="repo-tab-count">{liked.length}</span>}
        </button>
      </div>

      <div className="repo-filters">
        <button
          className={`repo-chip ${cat === 'all' ? 'active' : ''}`}
          onClick={() => setCat('all')}
        >Tất cả</button>
        {CATEGORIES.map(c => (
          <button
            key={c.key}
            className={`repo-chip ${cat === c.key ? 'active' : ''}`}
            onClick={() => setCat(c.key)}
            style={cat === c.key ? { borderColor: c.color, color: c.color } : undefined}
          >
            <span className="repo-chip-dot" style={{ background: c.color }} />
            {c.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="claude-error">
          Lỗi khi tải dữ liệu: {error}. Có thể bị rate limit GitHub API — thử lại sau ít phút.
        </div>
      )}

      <div className="repo-grid">
        {list.map(r => {
          const isLiked = likedIds.has(r.id)
          return (
            <article key={r.id} className="repo-card">
              <div className="repo-card-head">
                {r.owner_avatar && (
                  <img className="repo-avatar" src={r.owner_avatar} alt="" loading="lazy" />
                )}
                <a
                  className="repo-name"
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={r.full_name}
                >
                  {r.full_name}
                </a>
                <button
                  className={`repo-like ${isLiked ? 'liked' : ''}`}
                  onClick={() => toggleLike(r)}
                  title={isLiked ? 'Bỏ thích' : 'Lưu vào Đã thích'}
                  aria-label={isLiked ? 'Bỏ thích' : 'Thích'}
                >
                  {isLiked ? '❤' : '🤍'}
                </button>
              </div>

              {r.category && (
                <span
                  className="repo-cat-badge"
                  style={{ color: CAT_COLOR[r.category], borderColor: CAT_COLOR[r.category] }}
                >
                  {CAT_LABEL[r.category]}
                </span>
              )}

              {r.description && <p className="repo-desc">{r.description}</p>}

              {r.description && (() => {
                const tr = translations[r.id]
                return (
                  <>
                    {tr?.show && (
                      <div className="repo-vi">
                        {tr.loading && <span className="repo-vi-muted">Đang dịch…</span>}
                        {tr.error && <span className="repo-vi-muted">⚠️ {tr.error}. Bấm lại để thử.</span>}
                        {tr.text && <p>🇻🇳 {tr.text}</p>}
                      </div>
                    )}
                    <button className="repo-vi-btn" onClick={() => toggleTranslate(r)} disabled={tr?.loading}>
                      {tr?.loading
                        ? '⏳ Đang dịch…'
                        : tr?.show && tr?.text
                          ? 'Ẩn tiếng Việt'
                          : '🌐 Giải thích (Tiếng Việt)'}
                    </button>
                  </>
                )
              })()}

              {r.topics?.length > 0 && (
                <div className="repo-topics">
                  {r.topics.map(t => <span key={t} className="repo-topic">{t}</span>)}
                </div>
              )}

              <div className="repo-meta">
                {r.language && (
                  <span className="repo-meta-item">
                    <span
                      className="repo-lang-dot"
                      style={{ background: LANG_COLORS[r.language] || '#888' }}
                    />
                    {r.language}
                  </span>
                )}
                <span className="repo-meta-item">★ {formatStars(r.stargazers_count)}</span>
                <span className="repo-meta-item">⑂ {formatStars(r.forks_count)}</span>
                <span className="repo-meta-item repo-meta-time">{formatAgo(r.pushed_at)}</span>
              </div>
            </article>
          )
        })}

        {!loading && list.length === 0 && !error && (
          <div className="claude-empty">
            {view === 'liked'
              ? 'Chưa có repo nào được thích. Qua tab "Khám phá" và bấm ❤ để lưu.'
              : 'Không có repo nào khớp bộ lọc.'}
          </div>
        )}
      </div>
    </div>
  )
}
