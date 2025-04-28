import styled from '@emotion/styled'
// import Button from '@mui/material/Button'
import { KakaoLogin } from '@utils/kakao-login'
import publicLogo from '@assets/svgs/public-logo.svg'
import { getMobileVw } from '@utils/responsive'
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
          <LogoButtonWrapper onClick={toHome}>
            {/* <img src={publicLogo} alt="logo" className="logo-img" /> */}
            <LogoImage src={publicLogo} alt="logo" />
          </LogoButtonWrapper>

          {accountToken ? <KakaoLoginBtn onClick={() => handleLogout()}>로그아웃</KakaoLoginBtn> : <KakaoLogin />}
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
    padding: 12px ${getMobileVw(20)};
    /* margin: 12px 0; */
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
