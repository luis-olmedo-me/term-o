import { theme as t } from '@src/theme/theme.helpers'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face{
    font-family:cascadia code;
    font-style:normal;
    font-weight:400;
    src:local('Cascadia Code'), url(https://fonts.cdnfonts.com/s/29131/Cascadia.woff) format('woff')
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "${t('font.primary')}", Courier, monospace;
    background-color: ${t('colors.background')};
  }

  .vertical-scroller {
    &::-webkit-scrollbar {
      height: 10px;
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${t('colors.black')};
      border-radius: 3px;
      cursor: pointer;

      &:active,
      &:hover {
        background-color: ${t('colors.black')};
      }
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: ${t('colors.brightBlack')};
      cursor: pointer;

      &:active,
      &:hover {
        background-color: ${t('colors.brightGreen')};
      }
    }
  }
`

export default GlobalStyle
