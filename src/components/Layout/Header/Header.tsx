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

const HeaderContainer = styled.div`
  height: 90px;
  padding: 0 ${getPcVw(300)};
  background-color: #fff;

  display: flex;
  justify-content: space-between;

  position: sticky;
  top: 0;
  margin: 0 auto;

  color: #333;
  z-index: 999;
`

const KakaoLoginBtn = styled.button`
  font-size: 1.1875rem;
  padding: 12px 16px;

  border-radius: 5px;
  border: 1px solid #3ecdba;
  color: #3ecdba;
  background-color: #fff;

  &:hover {
    background-color: var(--gray-color);
  }
`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
