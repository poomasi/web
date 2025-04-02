// import { BrowserRouter } from 'react-router-dom'

// import { PrivateRoute } from './private-route'
// import { PublicRoute } from './public-route'

// export function Router() {
//   return <BrowserRouter>{false ? <PrivateRoute /> : <PublicRoute />}</BrowserRouter>
// }

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { PrivateRoute } from '@routes/PrivateRoute'
import { PublicRoute } from '@routes/PublicRoute'
import { Routers } from '@routes/Routerss'

const isAuthenticated = false // 인증상태 확인 로직 넣기..?

const router = createBrowserRouter([
  {
    path: Routers.OTHER,
    element: isAuthenticated ? <PrivateRoute /> : <PublicRoute />,
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
