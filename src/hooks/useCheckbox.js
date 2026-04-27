import { useState, useCallback, useMemo } from 'react'

const STORAGE_PREFIX = 'devhub-'

function loadChecked() {
  const result = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith(STORAGE_PREFIX) && localStorage.getItem(key) === 'true') {
      result[key.replace(STORAGE_PREFIX, '')] = true
    }
  }
  return result
}

export function useCheckbox() {
  const [checked, setChecked] = useState(loadChecked)

  const toggle = useCallback((key) => {
    setChecked(prev => {
      const next = { ...prev }
      if (next[key]) {
        delete next[key]
        localStorage.removeItem(STORAGE_PREFIX + key)
      } else {
        next[key] = true
        localStorage.setItem(STORAGE_PREFIX + key, 'true')
      }
      return next
    })
  }, [])

  const ALL_KEYS = useMemo(() => [
    'be-clr','be-async','be-solid','be-sql','be-http','be-di','be-security','be-testing',
    'be-ef','be-micro','be-docker','be-redis','be-cicd','be-msg','be-log','be-grpc','be-perf','be-ddd','be-sys','be-cloud'
  ], [])

  const progress = useMemo(() => {
    const total = ALL_KEYS.length
    const done = ALL_KEYS.filter(k => checked[k]).length
    return Math.round((done / total) * 100)
  }, [checked, ALL_KEYS])

  return { checked, toggle, progress }
}
