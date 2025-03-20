import { Route, Routes } from 'react-router-dom'
import { LandingPage, LoginPage } from '../pages'
import Layout from '@components/Layout/Layout'
import { isMobile } from 'react-device-detect'

export function PublicRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {isMobile ? (
          <>
            <Route path="*" element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
          </>
        ) : (
          <>
            <Route path="*" element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
          </>
        )}
      </Route>
    </Routes>
  )
}
