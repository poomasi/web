import Header from '@components/Layout/Header/Header'

interface LayoutProps {
  children?: React.ReactElement
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
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
