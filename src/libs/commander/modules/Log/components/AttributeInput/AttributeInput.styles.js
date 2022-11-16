import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'

export const Input = styled.input`
  padding: 6px 10px;
  width: -webkit-fill-available;
  border: none;
  font-family: Share Tech Mono;
  font-size: 1em;
  border-radius: ${t('radius.200')};
  background-color: ${t('transparent.300')};
  color: ${t('neutral.1200')};

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::selection {
    background-color: ${t('neutral.300')};
    color: ${t('yellow.800')};
  }
`
