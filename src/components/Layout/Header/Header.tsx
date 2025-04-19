import styled from '@emotion/styled'
import { accountTokenState } from '@store/account/account-token-store'
import { useRecoilValue } from 'recoil'
// import Button from '@mui/material/Button'
import { KakaoLogin } from '@utils/kakao-login'
import publicLogo from '@assets/svgs/public-logo.svg'
import { getMobileVw, getPcVw } from '@utils/responsive'

export default function Header() {
  const toHome = () => {
    window.location.href = '/'
  }

  const accountToken = useRecoilValue(accountTokenState) as string | null

  // const accountToken: string | null = useRecoilValue(accountTokenState)

  const handleLogout = () => {
    localStorage.removeItem('public_id')
    localStorage.removeItem('account_token')
    window.location.reload()
  }

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <div onClick={toHome} style={{ fontSize: '40px', cursor: 'pointer' }}>
            {/* <img src={publicLogo} alt="logo" className="logo-img" /> */}
            <LogoImage src={publicLogo} alt="logo" />
          </div>

          {accountToken ? <KakaoLoginBtn onClick={() => handleLogout()}>로그아웃</KakaoLoginBtn> : <KakaoLogin />}
        </HeaderContent>
      </HeaderContainer>

      {/* {children || <Outlet />} */}
    </>
  )
}

const LogoImage = styled.img`
  @media (max-width: 767px) {
    width: ${getMobileVw(68)};
    height: auto;
  }
`

const KakaoLoginBtn = styled.button`
  font-size: 1.1875rem;
  padding: 3px 1.25rem;
  color: white;
  background-color: black;

  &:hover {
    background-color: var(--gray-color);
  }

  @media (max-width: 767px) {
    width: ${getMobileVw(110)};
    height: auto;
  }
`

const HeaderContainer = styled.div`
  position: sticky;
  width: ${getPcVw(1320)};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  color: #333;
  background-color: #fff;
  z-index: 999;

  @media (max-width: 767px) {
    padding: 0 ${getMobileVw(10)};
  }
`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1vw;
`
