import styled from '@emotion/styled'

// import { Outlet } from 'react-router-dom'
// import { useRecoilState } from 'recoil'
// import { FormControl, FormGroup, FormControlLabel, Switch } from '@mui/material'

export default function Header() {
  const toHome = () => {
    window.location.href = ''
  }

  return (
    <>
      <HeaderContainer>
        <div onClick={toHome} style={{ fontSize: '3.75rem', cursor: 'pointer' }}>
          ㉬
        </div>
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
