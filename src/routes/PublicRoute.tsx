import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '@pages/index'
import Layout from '@components/Layout/Layout'
import { Routers } from '@routes/Routerss'
import { DetailPage } from '@pages/private/DetailPage.tsx'
import { DetailPageContextProvider } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'

export function PublicRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={Routers.ALL} element={<div>@</div>} />
        <Route path={Routers.LOGIN} element={<LoginPage />} />
        <Route
          path={Routers.DETAIL}
          element={
            <DetailPageContextProvider>
              <DetailPage />
            </DetailPageContextProvider>
          }
        />
      </Route>
    </Routes>
  )
}
