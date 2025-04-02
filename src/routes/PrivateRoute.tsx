import { Route, Routes } from 'react-router-dom'
import Layout from '@components/Layout/Layout'
import { Routers } from '@routes/routers'

export function PrivateRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={Routers.ALL} element={<></>} />
      </Route>
    </Routes>
  )
}
