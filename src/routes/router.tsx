// import { BrowserRouter } from 'react-router-dom'

// import { PrivateRoute } from './private-route'
// import { PublicRoute } from './public-route'

// export function Router() {
//   return <BrowserRouter>{false ? <PrivateRoute /> : <PublicRoute />}</BrowserRouter>
// }

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { PrivateRoute } from '@routes/PrivateRoute'
import { PublicRoute } from '@routes/PublicRoute'
import { ROUTES } from '@routes/ROUTE.ts'

const isAuthenticated = false // 인증상태 확인 로직 넣기

const router = createBrowserRouter([
  {
    path: ROUTES.OTHER,
    element: isAuthenticated ? <PrivateRoute /> : <PublicRoute />,
  },
  {
    path: ROUTES.ALL,
    element: <Navigate to="/" replace />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
