import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'
import { LoggerWrapper } from '../Logger/Logger.styles'

export const TerminalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${t('colors.background')};
  height: 100vh;

  & ${LoggerWrapper} {
    flex-grow: 1;
    overflow-y: scroll;
    overflow-x: hidden;
  }
`
