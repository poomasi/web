import { useCallback } from 'react'

export function useMoveToProfile() {
  const moveToProfile = useCallback((profileSection: string) => {
    const section = document.getElementById(profileSection)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    console.log('section', section)
  }, [])

  return { moveToProfile }
}
