import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const Dot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  display: inline-block;
  border-radius: 100%;

  &.red {
    background-color: ${t('colors.red')};
    border: ${t('space.50')} solid ${t('colors.white', '60')};
    color: ${t('colors.red')};
  }
`
