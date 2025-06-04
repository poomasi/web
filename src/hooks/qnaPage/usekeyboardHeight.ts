// src/hooks/useKeyboardHeight.ts
import { useEffect, useState } from 'react'

export function useKeyboardHeight(isMobile: boolean): number {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)

  useEffect(() => {
    if (!isMobile) return
    const handleResize = () => {
      if (window.visualViewport) {
        const heightDiff = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop //툴바값 오프셋으로 뺌
        setKeyboardHeight(heightDiff > 30 ? heightDiff : 0)
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
      window.visualViewport.addEventListener('scroll', handleResize)
    }

    window.addEventListener('focusin', handleResize)
    window.addEventListener('focusout', handleResize)

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
        window.visualViewport.removeEventListener('scroll', handleResize)
      }
      window.removeEventListener('focusin', handleResize)
      window.removeEventListener('focusout', handleResize)
    }
  }, [])

  return keyboardHeight
}
