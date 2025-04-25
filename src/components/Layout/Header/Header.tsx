import styled from '@emotion/styled'
// import Button from '@mui/material/Button'
import { KakaoLogin } from '@utils/kakao-login'
import publicLogo from '@assets/svgs/public-logo.svg'
import { getMobileVw, getPcVw } from '@utils/responsive'
import { useAccountStore } from '@store/account'

export default function Header() {
  const { accountToken, resetAccountToken } = useAccountStore()
  const toHome = () => {
    window.location.href = '/'
  }

  // const accountToken: string | null = useRecoilValue(accountTokenState)

  const handleLogout = () => {
    resetAccountToken()
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
  color: #08ae98;
  background-color: #fff;
  border-radius: 12px;
  border: 1.5px solid #3ecdba;

  &:hover {
    background-color: var(--gray-color);
  }

  @media (max-width: 767px) {
    width: 5rem;
    padding: 7px 12px;
    height: 28px;
    font-size: 12px;
    border-radius: 6px;
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
    width: 100%;
    padding: 0 ${getMobileVw(10)};
    margin: 12px 0;
  }
`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
