// src/hooks/useKeyboardHeight.ts
import { useEffect, useState } from 'react'

export function useKeyboardHeight(isMobile: boolean): { keyboardHeight: number; isTextareaFocused: boolean } {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)
  const [isTextareaFocused, setIsTextareaFocused] = useState(false)

  useEffect(() => {
    if (!isMobile) return
    const handleResize = () => {
      if (window.visualViewport) {
        const heightDiff = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop //툴바값 오프셋으로 뺌
        setKeyboardHeight(heightDiff > 30 ? heightDiff : 0)
      }
    }
    const handleFocusIn = (e: FocusEvent) => {
      if (e.target instanceof HTMLTextAreaElement) {
        setIsTextareaFocused(true)
        handleResize()
      }
    }

    const handleFocusOut = (e: FocusEvent) => {
      if (e.target instanceof HTMLTextAreaElement) {
        setIsTextareaFocused(false)
        setKeyboardHeight(0)
      }
    }

    const handleForceClose = () => {
      // 사용자가 스크롤로 키보드 닫았을 때
      setIsTextareaFocused(false)
      setKeyboardHeight(0)
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
      window.visualViewport.addEventListener('scroll', handleResize)
    }

    window.addEventListener('focusin', handleResize)
    window.addEventListener('focusout', handleResize)

    window.addEventListener('focusin', handleFocusIn)
    window.addEventListener('focusout', handleFocusOut)
    window.addEventListener('scroll', handleForceClose)

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
        window.visualViewport.removeEventListener('scroll', handleResize)
      }
      window.removeEventListener('focusin', handleFocusIn)
      window.removeEventListener('focusout', handleFocusOut)
      window.removeEventListener('scroll', handleForceClose)
    }
  }, [isMobile])

  return { keyboardHeight, isTextareaFocused }
}
