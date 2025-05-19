import Header from '@components/Layout/Header/Header'
// import { Footer } from '@components/Layout/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { PageviewTracker } from '@utils/google-analytics'
import { onMessageListener, requestForToken } from '@utils/fcm/firebase.ts'
import { useEffect } from 'react'

interface LayoutProps {
  children?: React.ReactElement
}

const Layout: React.FC<LayoutProps> = () => {
  const noficationPermission = () => {
    // 알림 권한 요청
    if ('Notification' in window) {
      console.log('Current notification permission:', Notification.permission)
      alert('실패 !')
      Notification.requestPermission().then((permission) => {
        console.log('알림 허용이 되어있나요 :', permission)
        if (permission === 'granted') {
          alert('성공했어요')
          // FCM 토큰 요청
          requestForToken().then((token) => {
            if (token) {
              console.log('requestForToken 성공!')
            }
          })
        }
        if (permission === 'denied') {
          console.log('알림이 거부되었어요')
          alert('알림이 거부되었어요')
        }
      })
    } else {
      alert('알림이 안가용')
      console.log('알림이 되지 않아요!')
    }

    // Foreground 메시지 수신 처리
    onMessageListener()
      .then((payload: any) => {
        // Foreground에서 알림 표시
        if (Notification.permission === 'granted') {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: '/logo.png',
          })
        }
        if (Notification.permission === 'denied') {
          console.log('알림이 거부되었어요!')
        }
      })
      .catch((err) => console.log('메시지 수신 에러:', err))
  }
  useEffect(() => {
    if (confirm('알림을 허용하시겠습니까?')) {
      noficationPermission()
    }
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
