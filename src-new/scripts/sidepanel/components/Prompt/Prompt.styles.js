import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'

export const Decoration = styled.p`
  margin: 0;
  padding: ${t('space.300')} ${t('space.500')};
  background-color: ${t('grey.900')};
  color: ${t('grey.50')};
  cursor: text;
`

export const PromptWrapper = styled.div`
  cursor: text;
`
