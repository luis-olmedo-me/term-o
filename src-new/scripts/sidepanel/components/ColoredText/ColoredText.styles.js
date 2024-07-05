import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'

export const Text = styled.span`
  color: ${({ color }) => color};

  &::selection {
    color: ${t('colors.bright-green')};
    background-color: ${t('colors..selection-background')};
  }
`
