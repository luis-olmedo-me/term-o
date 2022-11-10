import config from 'libs/configuration'
import styled from 'styled-components'

export const TextInput = styled.input`
  border: none;
  font-family: Share Tech Mono;
  margin: 0;
  border-radius: ${config.getTheme('border.200')};
  background-color: ${config.getTheme('transparent.400')};
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
    background-color: ${config.getTheme('neutral.300')};
    color: ${config.getTheme('yellow.800')};
  }
`
