// import { BrowserRouter } from 'react-router-dom'

// import { PrivateRoute } from './private-route'
// import { PublicRoute } from './public-route'

// export function Router() {
//   return <BrowserRouter>{false ? <PrivateRoute /> : <PublicRoute />}</BrowserRouter>
// }

import { BrowserRouter } from 'react-router-dom'
import { PublicRoute } from '@routes/PublicRoute.tsx'

/*const router = createBrowserRouter([
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
])*/

export function Router() {
  return (
    <BrowserRouter basename={'/'}>
      <PublicRoute />
    </BrowserRouter>
  )
}
