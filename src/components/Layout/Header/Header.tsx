import styled from '@emotion/styled'
// import Button from '@mui/material/Button'
import { KakaoLogin } from '@utils/kakao-login'
import publicLogo from '@assets/svgs/public-logo.svg'
// import { getMobileVw } from '@utils/responsive'
import { useAccountStore } from '@store/account'
import { requestForToken } from '@utils/fcm/firebase.ts'
import customAxios from '@api/customAxios.ts'

export default function Header() {
  const { accessToken, resetaccessToken } = useAccountStore()
  const toHome = () => {
    if ('Notification' in window) {
      console.log('Current notification permission:', Notification.permission)
      Notification.requestPermission().then((permission) => {
        console.log('알림 허용이 되어있나요 :', permission)
        if (permission === 'granted') {
          alert('성공했어요')
          // FCM 토큰 요청
          requestForToken().then((token) => {
            if (token) {
              console.log('requestForToken 성공!')
              customAxios.patch('/accounts/device-token', {
                deviceToken: token,
              })
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
    /*window.location.href = '/'*/
  }

  // const accessToken: string | null = useRecoilValue(accessTokenState)

  const handleLogout = () => {
    resetaccessToken()
    // localStorage.removeItem('account-token-storage')
    window.location.reload()
  }

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <LogoButtonWrapper onClick={toHome}>
            {/* <img src={publicLogo} alt="logo" className="logo-img" /> */}
            <LogoImage src={publicLogo} alt="logo" />
          </LogoButtonWrapper>

          {accessToken ? <KakaoLoginBtn onClick={() => handleLogout()}>로그아웃</KakaoLoginBtn> : <KakaoLogin />}
        </HeaderContent>
      </HeaderContainer>

      {/* {children || <Outlet />} */}
    </>
  )
}

const LogoButtonWrapper = styled.button`
  cursor: pointer;
  font-size: 40px;
  background: none;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    font-size: 0;
  }
`

const LogoImage = styled.img`
  @media (max-width: 1024px) {
    width: 6.125rem;
    height: 1.25rem;
  }
`

const KakaoLoginBtn = styled.button`
  font-size: 1.1875rem;
  padding: 0.6rem 1.25rem;
  color: #08ae98;
  background-color: #fff;
  border-radius: 12px;
  border: 1.5px solid #3ecdba;

  @media (max-width: 1024px) {
    width: 5rem;
    padding: 7px 12px;
    height: 30px;
    font-size: 12px;
    border-radius: 6px;
  }
`

const HeaderContainer = styled.div`
  position: sticky;
  width: 100%;
  padding: 1rem 0;
  top: 0;
  display: flex;
  justify-content: center;
  color: #333;
  background-color: #fff;
  z-index: 999;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 12px 0;
  }
`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;

  @media (max-width: 1320px) {
    padding: 0 5%;
  }
`
