import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'
import { LoggerWrapper } from '../Logger/Logger.styles'

export const TerminalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${t('grey.900')};
  height: 100vh;

  & ${LoggerWrapper} {
    flex-grow: 1;
    overflow: scroll;
  }

  &[aria-disabled='true']::after {
    content: 'The current URL is invalid.';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    backdrop-filter: invert(5%);
    color: ${t('red.200')};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
