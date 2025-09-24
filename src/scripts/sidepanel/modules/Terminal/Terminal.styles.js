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
  }
`

export const TerminalHeader = styled.header`
  padding: 0;
  margin-left: auto;
`
