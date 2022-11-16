import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'

const radius = t('radius.200')

export const TreeWrapper = styled.div`
  white-space: nowrap;
  font-weight: bold;
  border-radius: ${radius} 0 0 ${radius};
  overscroll-behavior: contain;
`
