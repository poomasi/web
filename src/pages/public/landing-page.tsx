// import { Header } from "../../components/layout/header";

import { Container } from '@styles/global-style'
import TitleSection from '@components/Layout/TitleSection'
import { PoomCounter } from '@components/Counter/PoomCounter'
import { ProfilesSection } from '@pages/public/ProfilesSection'
import { Footer } from '@components/Layout/Footer/Footer'

export function LandingPage() {
  return (
    <Container>
      <TitleSection />
      <PoomCounter />
      <ProfilesSection />
      <Footer />
    </Container>
  )
}
