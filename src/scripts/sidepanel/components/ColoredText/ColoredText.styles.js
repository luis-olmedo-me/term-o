import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Text = styled.span`
  color: ${({ color, theme }) => theme.colors[color]};
  line-height: ${t('line-height.300')};

  &::selection {
    color: ${t('colors.brightGreen')};
    background-color: ${t('colors.selectionBackground')};
  }
`
