import styled from '@emotion/styled'
import { accountTokenState } from '@store/account/account-token-store'
import { useRecoilValue } from 'recoil'
import Button from '@mui/material/Button'
import { KakaoLogin } from '@utils/kakao-login'

export default function Header() {
  const toHome = () => {
    window.location.href = ''
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
            ㉬
          </div>

          {accountToken ? (
            <Button
              onClick={() => handleLogout()}
              sx={{
                fontSize: '19px',
                padding: '3px 20px',
                color: 'white',
                backgroundColor: 'black',
                '&:hover': {
                  backgroundColor: 'var(--gray-color)',
                },
              }}
            >
              로그아웃
            </Button>
          ) : (
            <KakaoLogin />
          )}
        </HeaderContent>
      </HeaderContainer>

      {/* {children || <Outlet />} */}
    </>
  )
}

const HeaderContainer = styled.div`
  position: fixed;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-between; */
  width: 100%;
  height: 5rem;
  color: #333;
  background-color: #fff;
  z-index: 999;
`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
`
