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
      height: 8px;
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${t('colors.background')};
      cursor: pointer;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${t('colors.brightBlack')};
      cursor: pointer;

      &:active,
      &:hover {
        background-color: ${t('colors.green')};
      }
    }
  }
  
  select,
  ::picker(select) {
    appearance: base-select;
    border: none;
  }
`

export default GlobalStyle
