import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const TextAreaInput = styled.textarea`
  border: ${t('space.50')} solid ${t('colors.white', '40')};
  background-color: ${t('colors.white', '40')};
  border-radius: ${t('radius.200')};
  padding: ${t('space.300')};
  color: ${t('colors.foreground')};
  transition: border-color 0.1s ease-in-out;
  resize: none;
  width: 100%;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:focus {
    border: ${t('space.50')} solid ${t('colors.accent')};
  }

  &:hover {
    background-color: ${t('colors.accent')};
    color: ${({ selected }) => (selected ? t('colors.brightAccent') : t('colors.brightWhite'))};
    border-color: ${t('colors.accent')};
  }

  &::selection {
    color: ${t('colors.accent')};
    background-color: ${t('colors.selectionBackground')};
  }
`
