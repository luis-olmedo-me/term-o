import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'

export const Decoration = styled.p`
  margin: 0;
  padding: ${t('space.300')} ${t('space.500')};
  cursor: text;

  &::selection {
    color: ${t('green.A200')};
    background-color: ${t('grey.800')};
  }
`

export const PromptWrapper = styled.div`
  cursor: text;
  background-color: ${t('colors.background')};
  color: ${t('grey.50')};
`
