import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Dot = styled.span`
  width: 0.6rem;
  height: 0.6rem;
  display: inline-block;
  border-radius: ${t('radius.200')};

  &.blue {
    background-color: ${t('colors.blue')};
    border: ${t('space.50')} solid currentColor;
  }
  &.cyan {
    background-color: ${t('colors.cyan')};
    border: ${t('space.50')} solid currentColor;
  }
  &.green {
    background-color: ${t('colors.green')};
    border: ${t('space.50')} solid currentColor;
  }
  &.purple {
    background-color: ${t('colors.purple')};
    border: ${t('space.50')} solid currentColor;
  }
  &.red {
    background-color: ${t('colors.red')};
    border: ${t('space.50')} solid currentColor;
  }
  &.yellow {
    background-color: ${t('colors.yellow')};
    border: ${t('space.50')} solid currentColor;
  }
`
