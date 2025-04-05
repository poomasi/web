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

export function LandingPage() {
  return (
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
