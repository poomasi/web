import Header from '@components/Layout/Header/Header'
// import { Footer } from '@components/Layout/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { PageviewTracker } from '@utils/google-analytics'

interface LayoutProps {
  children?: React.ReactElement
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Header />
      <PageviewTracker />
      {/*Outlet 컴포넌트가 child 컴포넌트 랜더링을 진행합니다.*/}
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
