import { Route, Routes } from 'react-router-dom'
import Layout from '@components/Layout/Layout'
import { ROUTES } from '@routes/ROUTE.ts'

export function PrivateRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.ALL} element={<></>} />
      </Route>
    </Routes>
  )
}
