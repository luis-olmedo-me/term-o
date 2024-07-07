import { theme as t } from '@src/theme/theme.helpers'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Victor Mono';
    font-style: normal;
    font-weight: 100;
    src: local('Victor Mono'), url('https://fonts.cdnfonts.com/s/107396/VictorMono[wght].woff') format('woff');
}
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Victor Mono', Courier, monospace;
    background-color: ${t('colors.background')};
}
`

export default GlobalStyle
