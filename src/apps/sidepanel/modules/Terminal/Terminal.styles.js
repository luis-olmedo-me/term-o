import { theme as t } from '@src/helpers/themes.helpers'
import styled from 'styled-components'

export const TerminalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${t('colors.background')};
  height: 100vh;
`

export const TerminalHeader = styled.header`
  padding: 0;
  box-shadow: 0 -${t('space.400')} ${t('space.900')} ${t('space.900')} ${t('colors.background')};
  z-index: 1;
  display: flex;
  justify-content: end;
`
