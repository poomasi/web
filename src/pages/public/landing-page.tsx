// import { Header } from "../../components/layout/header";

import { Container } from '@styles/global-style'
import Header from '@components/Layout/Header/Header'
import TitleSection from '@components/Layout/TitleSection'
import { PoomCounter } from '@components/Counter/PoomCounter'
import { ProfilesSection } from '@pages/public/ProfilesSection'
import { Footer } from '@components/Layout/Footer/Footer'

export function LandingPage() {
  return (
    <div>
      <Container>
        <Header />
        <TitleSection />
        <PoomCounter />
        <ProfilesSection />
        <Footer />
      </Container>
    </div>
  )
}
