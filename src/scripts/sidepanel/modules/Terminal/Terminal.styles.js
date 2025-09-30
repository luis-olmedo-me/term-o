import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'
import Prompt from '../../components/Prompt'
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
  box-shadow: 0 -${t('space.400')} ${t('space.900')} ${t('space.900')} ${t('colors.background')};
  z-index: 1;
  display: flex;
  justify-content: end;
`

export const TerminalPrompt = styled(Prompt)`
  box-shadow: 0 ${t('space.100')} ${t('space.300')} ${t('space.300')} ${t('colors.background')};
`
