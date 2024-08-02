import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const ButtonWrapper = styled.button`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'fit-content')};
  border: none;
  font-weight: bold;
  color: ${t('colors.black')};
  border-radius: ${t('radius.200')};
  background-color: ${t('colors.white')};
  font-size: ${t('fontSize.100')};
  line-height: ${t('line-height.300')};
  font-family: ${t('font.primary')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }
`
