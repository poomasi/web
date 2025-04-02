import { Route, Routes } from 'react-router-dom'
import { LandingPage, LoginPage } from '@pages/index'
import Layout from '@components/Layout/Layout'
import { Routers } from '@routes/Routerss'
// import { isMobile } from 'react-device-detect'

export function PublicRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={Routers.LOGIN} element={<LoginPage />} />
        {/* <Route path={ROUTES.DETAIL} element={<DetailPage />} /> */}
        <Route path={Routers.ALL} element={<LandingPage />} />
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
