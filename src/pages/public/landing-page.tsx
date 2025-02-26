// import { Header } from "../../components/layout/header";

import Header from '@components/Layout/Header/Header'
import TitleSection from '@components/Layout/TitleSection'

export function LandingPage() {
  console.log('LandingPage 렌더링됨')
  return (
    <div>
      <Header />
      <TitleSection />
    </div>
  )
}
