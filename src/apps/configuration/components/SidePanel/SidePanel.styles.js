import styled from 'styled-components'

import { theme as t } from '@src/helpers/themes.helpers'

export const SidePanelWrapper = styled.div`
  border-right: ${t('space.50')} solid ${t('colors.white')};
  min-width: 200px;
`

export const IconWrapper = styled.div`
  margin: 0 auto;
  display: block;
  margin-block: ${t('space.900')};
  width: fit-content;
`
