import { Route, Routes } from 'react-router-dom'
import Layout from '@components/Layout/Layout'

export default function PrivateRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<></>} />
      </Route>
    </Routes>
  )
}
