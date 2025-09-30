import { theme as t } from '@src/libs/themer'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "${t('font.primary')}", Courier, monospace;
    background-color: ${t('colors.background')};
    font-size: ${t('fontSize.50')};
  }

  .vertical-scroller {
    &::-webkit-scrollbar {
      height: 10px;
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${t('colors.black')};
      border-radius: ${t('radius.150')};
      cursor: pointer;

      &:active,
      &:hover {
        background-color: ${t('colors.black')};
      }
    }

    &::-webkit-scrollbar-thumb {
      border-radius: ${t('radius.150')};
      background-color: ${t('colors.brightBlack')};
      cursor: pointer;

      &:active,
      &:hover {
        background-color: ${t('colors.brightWhite')};
      }
    }
  }
`

export default GlobalStyle
