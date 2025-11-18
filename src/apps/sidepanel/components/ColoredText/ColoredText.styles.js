import { theme as t } from '@src/helpers/themes.helpers'
import styled from 'styled-components'

export const Text = styled.span`
  line-height: ${t('lineHeight.300')};
  border-radius: ${t('radius.150')};
  transition: color 1s ease-in-out;
`
