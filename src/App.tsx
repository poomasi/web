import { ThemeProvider } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { GlobalStyle, globalTheme } from './styles'
import { Router } from './routes'

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
