// import { Header } from "../../components/layout/header";
import styled from '@emotion/styled'
import TitleSection from '@components/LandingPage/ui/web/TitleSection.tsx'
import { PoomCounter } from '@components/LandingPage/ui/web/PoomCounter.tsx'
import { ProfilesSection } from '@components/LandingPage/ui/web/ProfilesSection.tsx'
import { Footer } from '@components/Layout/Footer/Footer'
import { IntroduceSection } from '@components/LandingPage/ui/web/IntroduceSection.tsx'
import { PoomGuide } from '@components/LandingPage/ui/web/PoomGuide.tsx'
import { LandingDetailGuide } from '@components/LandingPage/ui/web/LandingDetailGuide.tsx'
import { useEffect, useState } from 'react'
import { MobileLandingPage } from '@pages/public/MobileLandingPage'

export function LandingPage() {
  // const sizeCheckTimer = useRef<NodeJS.Timeout | null>(null)

  //   if (sizeCheckTimer.current) {
  //     clearTimeout(sizeCheckTimer.current)
  //   }
  //   const timer = setTimeout(function () {
  //     console.log('모바일 화면')
  //     setIsMobile(window.innerWidth <= 767)
  //   }, 300)

  //   sizeCheckTimer.current = timer
  // }
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const sizeCheckEvent = () => {
    // console.log('resize 이벤트 발생')
    if (window.innerWidth <= 767) {
      setIsMobile(true)
    }
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 767)
    window.addEventListener('resize', sizeCheckEvent)
    return () => {
      window.removeEventListener('resize', sizeCheckEvent)
    }
  }, [])

  return isMobile ? (
    <MobileLandingPage />
  ) : (
    // Pc 랜더링 컴포넌트트
    <PageContainer>
      <TitleSection />
      <IntroduceSection />
      <PoomCounter />
      <PoomGuide />
      <ProfilesSection />
      <LandingDetailGuide />
      <Footer />
    </PageContainer>
  )
}

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    gap: 10rem;
    padding: 0 5vw;
  }
`

// const MobileLandingPageContainer = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 10rem;
//   padding: 0 5vw;
// `
