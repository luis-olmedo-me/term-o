import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Dot = styled.span`
  width: 0.6rem;
  height: 0.6rem;
  display: inline-block;
  border-radius: ${t('radius.200')};
  border: ${t('space.50')} solid currentColor;

  &.blue {
    background-color: ${t('colors.blue')};
  }
  &.cyan {
    background-color: ${t('colors.cyan')};
  }
  &.green {
    background-color: ${t('colors.green')};
  }
  &.purple {
    background-color: ${t('colors.purple')};
  }
  &.red {
    background-color: ${t('colors.red')};
  }
  &.yellow {
    background-color: ${t('colors.yellow')};
  }
`
