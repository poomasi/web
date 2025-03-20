import { Route, Routes } from 'react-router-dom'
import { LandingPage, LoginPage } from '../pages'
import { DetailPage } from '@pages/public/detail-page'
import Layout from '@components/Layout/Layout'

export function PublicRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}
