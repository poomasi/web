// src/pages/ResponsiveLandingPage.tsx
import { useEffect, useState } from 'react'
import LandingPage from './public/LandingPage' // 경로 alias가 안 먹으면 상대 경로로!
import MobileLandingPage from './public/MobileLandingPage'

export function ResponsiveLandingPage() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // 최초 렌더링 시 한 번만 실행
    setIsMobile(window.innerWidth <= 400)
  }, [])

  return <>{isMobile ? <MobileLandingPage /> : <LandingPage />}</>
}
