import { useState, useEffect, useCallback } from 'react'

const KEY = 'udomo_favorites'

export function useFavorites() {
  const [favIds, setFavIds] = useState<number[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY)
      if (stored) setFavIds(JSON.parse(stored))
    } catch {}
  }, [])

  const toggleFav = useCallback((id: number) => {
    setFavIds(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const isFav = useCallback((id: number) => favIds.includes(id), [favIds])

  const clearAll = useCallback(() => {
    setFavIds([])
    try { localStorage.removeItem(KEY) } catch {}
  }, [])

  return { favIds, toggleFav, isFav, clearAll }
}
