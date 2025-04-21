import styled from '@emotion/styled'
// import TitleSection from '@components/LandingPage/ui/web/TitleSection.tsx'
// import { PoomCounter } from '@components/LandingPage/ui/web/PoomCounter.tsx'
// import { ProfilesSection } from '@components/LandingPage/ui/web/ProfilesSection.tsx'
import { Footer } from '@components/Layout/Footer/Footer'
// import { IntroduceSection } from '@components/LandingPage/ui/web/IntroduceSection.tsx'
// import { PoomGuide } from '@components/LandingPage/ui/web/PoomGuide.tsx'
// import { LandingDetailGuide } from '@components/LandingPage/ui/web/LandingDetailGuide.tsx'
import * as MobileComponents from '@components/LandingPage/ui/mobile'

export function MobileLandingPage() {
  return (
    <PageContainer>
      <MobileComponents.MobileTitleSection />
      <MobileComponents.MobileIntroduceSection />
      <MobileComponents.MobilePoomCounter />
      <MobileComponents.MobileProfilesSection />
      <Footer />
    </PageContainer>
  )
}

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 375px) {
    /* gap: 1rem; */
    /* padding: 0 5vw; */
  }
`
