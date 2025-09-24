import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'
import { LoggerWrapper } from '../CommandsViewer/CommandsViewer.styles'

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
    padding-top: ${t('space.700')};
  }
`

export const TerminalHeader = styled.header`
  padding: 0;
  box-shadow: 0 0 15px 15px ${t('colors.background')};
  z-index: 1;
  display: flex;
  justify-content: end;
`
