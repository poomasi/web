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
import { PageviewTracker } from '@utils/google-analytics'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
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
  return (
    <RouterProvider router={router}>
      <PageviewTracker />
    </RouterProvider>
  )
}
