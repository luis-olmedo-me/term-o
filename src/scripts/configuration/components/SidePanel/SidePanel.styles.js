import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const SidePanelWrapper = styled.div`
  border-right: ${t('space.50')} solid ${t('colors.brightBlack')};
  padding: ${t('space.600')};
  min-width: 200px;
`
