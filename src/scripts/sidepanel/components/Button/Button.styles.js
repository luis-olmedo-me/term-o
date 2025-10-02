import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const ButtonWrapper = styled.button`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'fit-content')};
  color: ${({ selected }) => (selected ? t('colors.green') : t('colors.foreground'))};
  background-color: ${t('colors.background')};
  border: none;
  font-weight: bold;
  font-size: ${t('fontSize.100')};
  line-height: ${t('lineHeight.300')};
  font-family: ${t('font.primary')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${t('space.300')} ${t('space.300')};
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:hover {
    background-color: ${({ selected }) => (selected ? t('colors.green') : t('colors.black'))};
    color: ${({ selected }) => (selected ? t('colors.brightWhite') : t('colors.brightGreen'))};
  }
`
