import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Text = styled.span`
  color: ${({ color, theme }) => theme.colors[color]};
  background-color: ${({ bgcolor, theme }) => theme.colors[bgcolor]};
  line-height: ${t('lineHeight.300')};
  border-radius: ${t('radius.150')};
  white-space: break-spaces;

  &::selection {
    color: ${t('colors.green')};
    background-color: ${t('colors.selectionBackground')};
  }
`
