import {
  createAriaBgColorThemer,
  createAriaColorThemer,
  theme as t
} from '@src/helpers/themes.helpers'
import { createGlobalStyle } from 'styled-components'
import { slide } from './Animations.styles'

const GlobalStyle = createGlobalStyle`
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

  ${createAriaColorThemer}
  ${createAriaBgColorThemer}
`

export default GlobalStyle
