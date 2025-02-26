import { Route, Routes } from 'react-router-dom'
import { LandingPage, LoginPage } from '../pages'

export function PublicRoute() {
  return (
    <Routes>
      <Route path="/*" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
