import Header from '@components/Layout/Header/Header'
// import { Footer } from '@components/Layout/Footer/Footer'
import { Outlet } from 'react-router-dom'

interface LayoutProps {
  children?: React.ReactElement
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

//에러났던 거
// const Layout: React.FC = ({ children }: LayoutProps) => {
//   return (
//     <>
//       <Header />
//       {children}
//     </>
//   )
// }

export default Layout
