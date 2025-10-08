import { theme as t } from '@src/libs/themer'
import { createGlobalStyle } from 'styled-components'
import { slide } from './Animations.styles'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "${t('font.primary')}", Courier, monospace;
    background-color: ${t('colors.background')};
    font-size: ${t('fontSize.50')};

    &::selection {
      color: ${t('colors.foreground')};
      background-color: ${t('colors.selectionBackground')};
    }
  }

  .vertical-scroller {
    &::-webkit-scrollbar {
      height: ${t('space.300')};
      width: ${t('space.300')};
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
        background-color: ${t('colors.accent', 'cc')};
      }
    }
  }

  &[aria-loading='true'] {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      animation: ${slide} 1s linear infinite alternate;
      animation-timing-function: ease-in-out;
      width: 5%;
      height: ${t('space.100')};
      background: ${t('colors.accent')};
      bottom: 0;
      left: 0;
      border-radius: ${t('radius.100')} ${t('radius.100')} 0 0;
      box-shadow: 0 -10px 25px 5px ${t('colors.accent')};
    }
  }

  select,
  ::picker(select) {
    appearance: base-select;
    border: none;
  }
`

export default GlobalStyle
