import { useState, useEffect, useCallback, useRef } from 'react'
import { CLAUDE_NEWS_EVENT } from '../hooks/useClaudeBadge'

const REPO = 'anthropics/claude-code'
const API_URL = `https://api.github.com/repos/${REPO}/releases?per_page=15`
const POLL_INTERVAL_MS = 5 * 60 * 1000
const STORAGE_LAST_SEEN = 'devhub-claude-last-seen-release'
const STORAGE_CACHE = 'devhub-claude-releases-cache'
const STORAGE_TRANSLATION_PREFIX = 'devhub-claude-vi-'

// Google Translate public endpoint — free, không cần API key, đủ tốt cho release notes.
// Giới hạn ~5000 ký tự/request → chia chunk nếu dài.
const GTRANSLATE_URL = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t'
const MAX_CHUNK = 4500

function splitIntoChunks(text, maxLen = MAX_CHUNK) {
  if (text.length <= maxLen) return [text]
  // Chia theo paragraph để không cắt giữa câu
  const paragraphs = text.split(/\n\n+/)
  const chunks = []
  let buf = ''
  for (const p of paragraphs) {
    if ((buf + '\n\n' + p).length > maxLen && buf) {
      chunks.push(buf)
      buf = p
    } else {
      buf = buf ? buf + '\n\n' + p : p
    }
  }
  if (buf) chunks.push(buf)
  // Paragraph quá dài thì cắt thô theo maxLen
  return chunks.flatMap(c => {
    if (c.length <= maxLen) return [c]
    const parts = []
    for (let i = 0; i < c.length; i += maxLen) parts.push(c.slice(i, i + maxLen))
    return parts
  })
}

async function translateChunk(chunk) {
  const url = `${GTRANSLATE_URL}&q=${encodeURIComponent(chunk)}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Google Translate ${res.status}`)
  }
  const data = await res.json()
  // Response format: [[[translated, source, null, null, ...], ...], ...]
  return (data?.[0] || []).map(row => row?.[0] || '').join('')
}

async function translateToVietnamese(text) {
  if (!text || !text.trim()) return ''
  const chunks = splitIntoChunks(text)
  const results = []
  for (const chunk of chunks) {
    // Retry 1 lần nếu transient fail
    try {
      results.push(await translateChunk(chunk))
    } catch {
      await new Promise(r => setTimeout(r, 500))
      results.push(await translateChunk(chunk))
    }
  }
  return results.join('')
}

function renderMarkdown(md) {
  if (!md) return ''
  const esc = (s) => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
  const lines = md.split('\n')
  const out = []
  let inList = false
  let inCode = false
  let codeBuf = []

  const closeList = () => { if (inList) { out.push('</ul>'); inList = false } }

  for (const raw of lines) {
    const line = raw

    if (line.startsWith('```')) {
      if (inCode) {
        out.push(`<pre class="md-code">${esc(codeBuf.join('\n'))}</pre>`)
        codeBuf = []
        inCode = false
      } else {
        closeList()
        inCode = true
      }
      continue
    }
    if (inCode) { codeBuf.push(line); continue }

    const h = line.match(/^(#{1,4})\s+(.*)$/)
    if (h) {
      closeList()
      const lvl = h[1].length + 1
      out.push(`<h${lvl} class="md-h">${inline(esc(h[2]))}</h${lvl}>`)
      continue
    }

    const bullet = line.match(/^\s*[-*]\s+(.*)$/)
    if (bullet) {
      if (!inList) { out.push('<ul class="md-ul">'); inList = true }
      out.push(`<li>${inline(esc(bullet[1]))}</li>`)
      continue
    }

    if (!line.trim()) { closeList(); out.push(''); continue }

    closeList()
    out.push(`<p class="md-p">${inline(esc(line))}</p>`)
  }
  closeList()
  if (inCode) out.push(`<pre class="md-code">${esc(codeBuf.join('\n'))}</pre>`)
  return out.join('\n')
}

function inline(s) {
  return s
    .replace(/`([^`]+)`/g, '<code class="md-ic">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
}

function formatAgo(date) {
  if (!date) return ''
  const s = Math.floor((Date.now() - date.getTime()) / 1000)
  if (s < 60) return `${s}s trước`
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`
  return `${Math.floor(s / 86400)} ngày trước`
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })
}

export default function ClaudeNews() {
  const [releases, setReleases] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_CACHE)
      return cached ? JSON.parse(cached) : []
    } catch {
      return []
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [lastSeenTag, setLastSeenTag] = useState(
    () => localStorage.getItem(STORAGE_LAST_SEEN) || ''
  )
  const [, forceTick] = useState(0)
  const abortRef = useRef(null)

  const fetchReleases = useCallback(async () => {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL, {
        signal: ctrl.signal,
        headers: { Accept: 'application/vnd.github+json' }
      })
      if (!res.ok) throw new Error(`GitHub API ${res.status}`)
      const data = await res.json()
      setReleases(data)
      setLastUpdated(new Date())
      try {
        localStorage.setItem(STORAGE_CACHE, JSON.stringify(data))
      } catch { /* ignore quota errors */ }
      window.dispatchEvent(new CustomEvent(CLAUDE_NEWS_EVENT))
    } catch (e) {
      if (e.name !== 'AbortError') setError(e.message || 'Unknown error')
    } finally {
      if (abortRef.current === ctrl) setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReleases()
    const timer = setInterval(fetchReleases, POLL_INTERVAL_MS)
    return () => {
      clearInterval(timer)
      abortRef.current?.abort()
    }
  }, [fetchReleases])

  useEffect(() => {
    const tick = setInterval(() => forceTick(v => v + 1), 30_000)
    return () => clearInterval(tick)
  }, [])

  const markAllSeen = () => {
    if (releases[0]) {
      localStorage.setItem(STORAGE_LAST_SEEN, releases[0].tag_name)
      setLastSeenTag(releases[0].tag_name)
      window.dispatchEvent(new CustomEvent(CLAUDE_NEWS_EVENT))
    }
  }

  // Translation state: { [tag]: { text?, loading?, error?, show? } }
  const [translations, setTranslations] = useState(() => {
    try {
      const acc = {}
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k && k.startsWith(STORAGE_TRANSLATION_PREFIX)) {
          const tag = k.slice(STORAGE_TRANSLATION_PREFIX.length)
          acc[tag] = { text: localStorage.getItem(k), show: false }
        }
      }
      return acc
    } catch {
      return {}
    }
  })

  const toggleTranslate = useCallback(async (release) => {
    const tag = release.tag_name
    const existing = translations[tag]

    // Already translated → just toggle visibility
    if (existing?.text) {
      setTranslations(t => ({ ...t, [tag]: { ...t[tag], show: !t[tag].show } }))
      return
    }
    if (existing?.loading) return

    setTranslations(t => ({ ...t, [tag]: { loading: true, show: true } }))
    try {
      const translated = await translateToVietnamese(release.body || '')
      try { localStorage.setItem(STORAGE_TRANSLATION_PREFIX + tag, translated) } catch { /* quota */ }
      setTranslations(t => ({ ...t, [tag]: { text: translated, show: true } }))
    } catch (e) {
      setTranslations(t => ({ ...t, [tag]: { error: e.message || 'Lỗi dịch', show: true } }))
    }
  }, [translations])

  const newIndex = lastSeenTag
    ? releases.findIndex(r => r.tag_name === lastSeenTag)
    : -1
  const newCount = newIndex === -1 ? releases.length : newIndex

  return (
    <div className="claude-news">
      <div className="claude-news-header">
        <div>
          <h1>
            AI Claude — Live Updates
            {newCount > 0 && <span className="badge-count">{newCount} mới</span>}
          </h1>
          <p className="claude-news-subtitle">
            Releases của <code>{REPO}</code> · Tự động cập nhật mỗi 5 phút
          </p>
        </div>
        <div className="claude-news-actions">
          <span className="claude-news-status">
            {loading
              ? 'Đang tải...'
              : lastUpdated
                ? `Cập nhật: ${formatAgo(lastUpdated)}`
                : 'Chưa tải'}
          </span>
          <button className="claude-btn" onClick={fetchReleases} disabled={loading}>
            {loading ? '...' : 'Refresh'}
          </button>
          {newCount > 0 && (
            <button className="claude-btn claude-btn-secondary" onClick={markAllSeen}>
              Đánh dấu đã đọc
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="claude-error">
          Lỗi khi tải dữ liệu: {error}. Thử lại sau (có thể bị rate limit GitHub API).
        </div>
      )}

      <div className="claude-releases">
        {releases.map((r, i) => {
          const isNew = newIndex === -1 ? true : i < newIndex
          const tr = translations[r.tag_name]
          const showVi = tr?.show && (tr.text || tr.loading || tr.error)
          return (
            <article key={r.id} className={`claude-release ${isNew ? 'is-new' : ''}`}>
              <div className="claude-release-head">
                <h2>
                  {r.name || r.tag_name}
                  {isNew && <span className="badge-new">MỚI</span>}
                  {r.prerelease && <span className="badge-pre">PRE</span>}
                </h2>
                <span className="claude-release-date">{formatDate(r.published_at)}</span>
              </div>
              <div className="claude-release-tag">{r.tag_name}</div>

              {r.body && !showVi && (
                <div
                  className="claude-release-body"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(r.body) }}
                />
              )}
              {showVi && (
                <div className="claude-release-body claude-release-body-vi">
                  {tr.loading && (
                    <div className="claude-translating">
                      <span className="claude-spinner" /> Đang dịch...
                    </div>
                  )}
                  {tr.error && (
                    <div className="claude-error-inline">
                      ⚠️ Lỗi dịch: {tr.error}. Click lại để thử.
                    </div>
                  )}
                  {tr.text && (
                    <div dangerouslySetInnerHTML={{ __html: renderMarkdown(tr.text) }} />
                  )}
                </div>
              )}

              <div className="claude-release-footer">
                {r.body && (
                  <button
                    className="claude-btn claude-btn-small"
                    onClick={() => toggleTranslate(r)}
                    disabled={tr?.loading}
                  >
                    {tr?.loading
                      ? '⏳ Đang dịch...'
                      : tr?.show && tr?.text
                        ? '🇬🇧 Xem bản gốc'
                        : tr?.text
                          ? '🇻🇳 Xem tiếng Việt'
                          : '🌐 Dịch tiếng Việt'}
                  </button>
                )}
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="claude-release-link"
                >
                  Xem trên GitHub ↗
                </a>
              </div>
            </article>
          )
        })}

        {!loading && releases.length === 0 && !error && (
          <div className="claude-empty">Không có release nào.</div>
        )}
      </div>
    </div>
  )
}
