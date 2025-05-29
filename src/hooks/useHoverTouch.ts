import { useState, useCallback } from 'react'

export function useHoverTouch() {
  const [isHover, setIsHover] = useState(false)

  const onMouseEnter = useCallback(() => setIsHover(true), [])
  const onMouseLeave = useCallback(() => setIsHover(false), [])
  const onTouchStart = useCallback(() => setIsHover(true), [])
  const onTouchEnd = useCallback(() => setIsHover(false), [])

  return { isHover, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd }
}
