// import { Header } from "../../components/layout/header";

import { Container } from '@styles/global-style'
import TitleSection from '@components/LandingPage/ui/web/TitleSection.tsx'
import { PoomCounter } from '@components/LandingPage/ui/web/PoomCounter.tsx'
import { ProfilesSection } from '@components/LandingPage/ui/web/ProfilesSection.tsx'
import { Footer } from '@components/Layout/Footer/Footer'
import { IntroduceSection } from '@components/LandingPage/ui/web/IntroduceSection.tsx'
import { PoomGuide } from '@components/LandingPage/ui/web/PoomGuide.tsx'
import { LandingDetailGuide } from '@components/LandingPage/ui/web/LandingDetailGuide.tsx'

export function LandingPage() {
  return (
    <Container>
      <TitleSection />
      <IntroduceSection />
      <PoomCounter />
      <PoomGuide />
      <ProfilesSection />
      <LandingDetailGuide />
      <Footer />
    </Container>
  )
}
