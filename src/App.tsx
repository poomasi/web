import { ThemeProvider } from '@mui/material'
import { globalTheme } from '@styles/global-theme'
import { GlobalStyle } from '@styles/GlobalStyle'
import { Router } from '@routes/router'
import { Toast } from '@components/toast'
import { useEffect } from 'react'
import { useMobileStore } from '@store/useMobileStore.ts'

import { useAccountStore } from '@store/account'

function App() {
  const { setAccountToken, setPublicId } = useAccountStore()

  const { setIsMobile } = useMobileStore()
  const sizeCheckEvent = () => {
    setIsMobile(window.innerWidth <= 767)
  }

  useEffect(() => {
    const isLocal = window.location.hostname === 'localhost'
    const isTesting = true // 필요시 query string이나 환경변수로 조절 가능
    if (isLocal && isTesting) {
      setAccountToken('test.jwt.token.value')
      setPublicId('test-user-id')
    }

    setIsMobile(window.innerWidth <= 767)
    window.addEventListener('resize', sizeCheckEvent)
    return () => {
      window.removeEventListener('resize', sizeCheckEvent)
    }
  }, [])

  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <Router />
      <Toast />
    </ThemeProvider>
  )
}

export default App
