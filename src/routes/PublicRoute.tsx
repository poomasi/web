import { Route, Routes } from 'react-router-dom'
import { LandingPage, LoginPage } from '@pages/index'
import Layout from '@components/Layout/Layout'
import { Routers } from '@routes/Routerss'
import { DetailPage } from '@pages/private/DetailPage.tsx'
import { DetailPageContextProvider } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
// import { isMobile } from 'react-device-detect'

export function PublicRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={Routers.LOGIN} element={<LoginPage />} />
        <Route path={Routers.DETAIL} element={
          <DetailPageContextProvider>
            <DetailPage />
          </DetailPageContextProvider>
          } />
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
