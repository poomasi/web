import { Global, css } from '@emotion/react'

const styles = css`
  :root {
    --gray-color: #717171;
    --light-gray-color: #aaaaaa;
  }

  h1 {
    font-size: 30px;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 21px;
  }
  pageContainer {
    width: 100%;
    padding: 0 5% 0 5%;
  }
`

export const GlobalStyle = () => {
  return <Global styles={styles} />
}
