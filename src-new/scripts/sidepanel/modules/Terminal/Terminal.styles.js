import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'
import { LoggerWrapper } from '../Logger/Logger.styles'

export const TerminalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${t('grey.900')};
  height: 100vh;

  & ${LoggerWrapper} {
    flex: 1;
  }
`
