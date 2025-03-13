import { ThemeProvider } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { globalTheme } from '@styles/global-theme'
import { GlobalStyle } from '@styles/GlobalStyle'
import { Router } from '@routes/Router'

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={globalTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
