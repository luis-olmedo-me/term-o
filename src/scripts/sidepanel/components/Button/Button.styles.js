import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const ButtonWrapper = styled.button`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  border: none;
  font-weight: bold;
  color: ${t('colors.black')};
  border-radius: ${t('radius.300')};
  background-color: ${t('colors.white')};
  font-size: ${t('fontSize.100')};
  cursor: pointer;
  vertical-align: middle;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }
`
