import { ThemeProvider } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { globalTheme } from '@styles/global-theme'
import { GlobalStyle } from '@styles/GlobalStyle'
import { Router } from '@routes/router'
import { Toast } from '@components/toast'

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={globalTheme}>
        <GlobalStyle />
        <Router />
        <Toast />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
