import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Dot = styled.span`
  width: 0.6rem;
  height: 0.6rem;
  display: inline-block;
  border-radius: ${t('radius.200')};
  border: ${t('space.50')} solid currentColor;
  background-color: ${({ color, theme }) => theme.colors[color]};
`
