import styled from '@emotion/styled'
import { Footer } from '@components/Layout/Footer/Footer'
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
