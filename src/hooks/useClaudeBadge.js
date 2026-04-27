import { useState, useEffect, useCallback } from 'react'

const REPO = 'anthropics/claude-code'
const API_URL = `https://api.github.com/repos/${REPO}/releases?per_page=15`
const STORAGE_CACHE = 'devhub-claude-releases-cache'
const STORAGE_LAST_SEEN = 'devhub-claude-last-seen-release'
const BG_POLL_MS = 15 * 60 * 1000
const EVENT_UPDATED = 'claude-news-updated'

function computeNewCount() {
  try {
    const releases = JSON.parse(localStorage.getItem(STORAGE_CACHE) || '[]')
    const lastSeen = localStorage.getItem(STORAGE_LAST_SEEN) || ''
    if (!releases.length) return 0
    if (!lastSeen) return releases.length
    const i = releases.findIndex(r => r.tag_name === lastSeen)
    return i === -1 ? releases.length : i
  } catch {
    return 0
  }
}

export function useClaudeBadge() {
  const [count, setCount] = useState(computeNewCount)

  const refresh = useCallback(async () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return
    try {
      const res = await fetch(API_URL, {
        headers: { Accept: 'application/vnd.github+json' }
      })
      if (!res.ok) return
      const data = await res.json()
      localStorage.setItem(STORAGE_CACHE, JSON.stringify(data))
      setCount(computeNewCount())
      window.dispatchEvent(new CustomEvent(EVENT_UPDATED))
    } catch {
      /* silent — badge chỉ là phụ trợ */
    }
  }, [])

  useEffect(() => {
    // defer to next tick so initial fetch doesn't call setState inside the effect body
    const kick = setTimeout(refresh, 0)
    const timer = setInterval(refresh, BG_POLL_MS)

    const onUpdate = () => setCount(computeNewCount())
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    window.addEventListener(EVENT_UPDATED, onUpdate)
    window.addEventListener('storage', onUpdate)
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      clearTimeout(kick)
      clearInterval(timer)
      window.removeEventListener(EVENT_UPDATED, onUpdate)
      window.removeEventListener('storage', onUpdate)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [refresh])

  return count
}

export const CLAUDE_NEWS_EVENT = EVENT_UPDATED
