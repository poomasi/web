// import { Route, Routes } from 'react-router-dom'
import { LandingPage, LoginPage } from '../pages'
import { DetailPage } from '@pages/public/detail-page'

export function PublicRoute() {
  return (
    <>
      <LandingPage />
      <LoginPage />
      <DetailPage />
    </>
  )
  // return (
  //   <Routes>
  //     <Route path="/*" element={<LandingPage />} />
  //     <Route path="/login" element={<LoginPage />} />
  //   </Routes>
  // )
}
