import Header from '@components/Layout/Header/Header'
// import { Footer } from '@components/Layout/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { PageviewTracker } from '@utils/google-analytics'
import { useEffect } from 'react'

interface LayoutProps {
  children?: React.ReactElement
}

const Layout: React.FC<LayoutProps> = () => {
  // 서비스워커 등록 해제 및 캐시 삭제 함수
  async function unregisterServiceWorker() {
    try {
      // 모든 서비스워커 등록 가져오기
      const registrations = await navigator.serviceWorker.getRegistrations()

      // 모든 서비스워커 등록 해제
      if (registrations.length === 0) {
        return
      }

      for (const registration of registrations) {
        await registration.unregister()
      }

      // 캐시 스토리지 이름 목록 가져오기
      const cacheNames = await caches.keys()

      // 모든 캐시 삭제
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))

      // 페이지 새로고침 (선택사항)
      window.location.reload()
    } catch (error) {
      console.error('서비스워커 삭제 중 오류 발생:', error)
    }
  }

  useEffect(() => {
    // 함수 실행
    unregisterServiceWorker()
  }, [])

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
