import { Route, Routes } from 'react-router-dom'
import { LandingPage, LoginPage } from '@pages/index'
import Layout from '@components/Layout/Layout'
import { ROUTES } from '@routes/ROUTE.ts'
// import { isMobile } from 'react-device-detect'

export function PublicRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        {/* <Route path={ROUTES.DETAIL} element={<DetailPage />} /> */}
        <Route path={ROUTES.ALL} element={<LandingPage />} />
      </Route>
    </Routes>
    // <Routes>
    //   <Route element={<Layout />}>
    //     {isMobile ? (
    //       <>
    //         <Route path="*" element={<LandingPage />} />
    //         <Route path="login" element={<LoginPage />} />
    //       </>
    //     ) : (
    //       <>
    //         <Route path="*" element={<LandingPage />} />
    //         <Route path="login" element={<LoginPage />} />
    //       </>
    //     )}
    //   </Route>
    // </Routes>
  )
}
