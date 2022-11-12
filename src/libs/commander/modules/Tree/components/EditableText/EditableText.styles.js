import { theme as t } from 'src/helpers/theme.helpers'
import styled from 'styled-components'

export const TextInput = styled.input`
  border: none;
  font-family: Share Tech Mono;
  margin: 0;
  border-radius: ${t('radius.200')};
  background-color: ${t('transparent.400')};
  color: white;
  min-width: 3ch;
  text-align: center;
  padding: 4px;
  font-size: 1em;

  &:focus,
  &:active {
    outline: none;
  }

  &::selection {
    background-color: ${t('neutral.300')};
    color: ${t('yellow.800')};
  }
`
