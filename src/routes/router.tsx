// import { BrowserRouter } from 'react-router-dom'

// import { PrivateRoute } from './private-route'
// import { PublicRoute } from './public-route'

// export function Router() {
//   return <BrowserRouter>{false ? <PrivateRoute /> : <PublicRoute />}</BrowserRouter>
// }

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Routers } from '@routes/Routerss'
import Layout from '@components/Layout/Layout.tsx'
import { LandingPage, LoginPage } from '@pages/public'
import { DetailPageContextProvider } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { DetailPage } from '@pages/private/DetailPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // children 컴포넌트가 Layout 하위에 랜더링됩니다.
    // Layout 은 Child 컴포넌트를 Outlet 으로 랜더링합니다.
    children: [
      {
        // index true 의 경우, 상위 path에 해당하는 path 를 가진 컴포넌트가 랜더링됩니다.
        index: true,
        element: <LandingPage />,
      },
      {
        // path 를 지니는 경우, 상위패스 + path 를 가진 컴포넌트가 랜더링됩니다.
        path: Routers.LOGIN,
        element: <LoginPage />,
      },
      {
        path: Routers.DETAIL,
        element: (
          <DetailPageContextProvider>
            <DetailPage />
          </DetailPageContextProvider>
        ),
      },
    ],
  },
  {
    path: Routers.ALL,
    element: <Navigate to="/" replace />,
    //404 페이지 대신 홈으로 강제 리디렉션
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
