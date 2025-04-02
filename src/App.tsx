import { ThemeProvider } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { globalTheme } from '@styles/global-theme'
import { GlobalStyle } from '@styles/GlobalStyle'
import { Router } from '@routes/Router'

function App() {
  return (
    <RecoilRoot>
      <div style={{ maxWidth: '375px', margin: '0 auto', background: '#fff' }}>
        <ThemeProvider theme={globalTheme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </div>
    </RecoilRoot>
  )
}

export default App
