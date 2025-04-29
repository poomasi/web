import { ThemeProvider } from '@mui/material'
import { globalTheme } from '@styles/global-theme'
import { GlobalStyle } from '@styles/GlobalStyle'
import { Router } from '@routes/router'
import { Toast } from '@components/toast'
import { useEffect } from 'react'
import { useMobileStore } from '@store/useMobileStore.ts'

function App() {
  const { setIsMobile } = useMobileStore()
  const sizeCheckEvent = () => {
    setIsMobile(window.innerWidth <= 1024)
  }

  useEffect(() => {
    sizeCheckEvent()
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
