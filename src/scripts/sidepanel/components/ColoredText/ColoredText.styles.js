import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'

export const Text = styled.span`
  color: ${({ color }) => color};
  line-height: ${t('line-height.300')};

  &::selection {
    color: ${t('colors.brightGreen')};
    background-color: ${t('colors.selectionBackground')};
  }
`
