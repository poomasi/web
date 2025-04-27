// import { Header } from "../../components/layout/header";
import styled from '@emotion/styled'
import TitleSection from '@components/LandingPage/ui/web/TitleSection.tsx'
import { PoomCounter } from '@components/LandingPage/ui/web/PoomCounter.tsx'
import { ProfilesSection } from '@components/LandingPage/ui/web/ProfilesSection.tsx'
import { Footer } from '@components/Layout/Footer/Footer'
import { IntroduceSection } from '@components/LandingPage/ui/web/IntroduceSection.tsx'
import { MobileLandingPage } from '@pages/public/MobileLandingPage'
import { useMobileStore } from '@store/useMobileStore.ts'

export function LandingPage() {
  const { isMobile } = useMobileStore()

  return isMobile ? (
    <MobileLandingPage />
  ) : (
    // Pc 랜더링 컴포넌트트
    <PageContainer>
      <TitleSection />
      <IntroduceSection />
      <PoomCounter />
      {/*<PoomGuide />*/}
      <ProfilesSection />
      {/*<LandingDetailGuide />*/}
      <Footer />
    </PageContainer>
  )
}

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  @media (max-width: 767px) {
    gap: 10rem;
    padding: 0 5vw;
  }
`
