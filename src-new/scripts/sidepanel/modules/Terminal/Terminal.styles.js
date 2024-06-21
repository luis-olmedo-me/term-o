import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'
import { LoggerWrapper } from '../../components/Logger/Logger.styles'

export const TerminalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${t('space.400')};
  background-color: ${t('grey.900')};
  height: 100vh;

  & ${LoggerWrapper} {
    flex: 1;
  }
`
