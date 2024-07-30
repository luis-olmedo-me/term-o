import { createGlobalStyle } from 'styled-components'

const ThemeStyle = createGlobalStyle`
  html {
    font-size: ${({ mainFontSize }) => mainFontSize}px;
  }
`

export default ThemeStyle
