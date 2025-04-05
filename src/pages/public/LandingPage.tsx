// import { Header } from "../../components/layout/header";
import styled from '@emotion/styled'
// import { Container } from '@styles/global-style'
import TitleSection from '@components/LandingPage/ui/web/TitleSection.tsx'
import { PoomCounter } from '@components/LandingPage/ui/web/PoomCounter.tsx'
import { ProfilesSection } from '@components/LandingPage/ui/web/ProfilesSection.tsx'
import { Footer } from '@components/Layout/Footer/Footer'
import { IntroduceSection } from '@components/LandingPage/ui/web/IntroduceSection.tsx'
import { PoomGuide } from '@components/LandingPage/ui/web/PoomGuide.tsx'
import { LandingDetailGuide } from '@components/LandingPage/ui/web/LandingDetailGuide.tsx'
import { useEffect, useRef, useState } from 'react'

export function LandingPage() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const sizeCheckTimer = useRef<NodeJS.Timeout | null>( null);

  const sizeCheckEvent = () => {
    if(sizeCheckTimer.current){
      clearTimeout(sizeCheckTimer.current);
    }

    const timer = setTimeout(function(){
      // width 가 524인 경우, isMobile 활성화
      console.log("모바일 화면")
      setIsMobile(window.innerWidth <= 524);
    }, 300);

    sizeCheckTimer.current = timer;
  }

  
  useEffect(() => {
    // 최초 모바일 여부 확인 로직 추가
    setIsMobile(window.innerWidth <= 524);
    window.addEventListener('resize', sizeCheckEvent);
    return () => {
      window.removeEventListener('resize',sizeCheckEvent)
    }
  }, []);


  return (
<<<<<<< HEAD
    <PageContainer>
=======
    isMobile ? (
      // 모바일 컴포넌트
      <PCLandingPageContainer>
>>>>>>> 8f2627cf5240007a2b9c9938d5a8b571dcc5a061
      <TitleSection />
      <IntroduceSection />
      <PoomCounter />
      <PoomGuide />
      <ProfilesSection />
      <LandingDetailGuide />
      <Footer />
<<<<<<< HEAD
    </PageContainer>
=======
    </PCLandingPageContainer>
    ) : (
      // Pc 랜더링 컴포넌트트
      <PCLandingPageContainer>
        <TitleSection />
        <IntroduceSection />
        <PoomCounter />
        <PoomGuide />
        <ProfilesSection />
        <LandingDetailGuide />
        <Footer />
      </PCLandingPageContainer>
    )
>>>>>>> 8f2627cf5240007a2b9c9938d5a8b571dcc5a061
  )
}

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 375px) {
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
