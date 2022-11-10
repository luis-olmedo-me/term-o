import config from 'libs/configuration'
import styled from 'styled-components'

export const Input = styled.input`
  padding: 6px 10px;
  width: -webkit-fill-available;
  border: none;
  border-radius: 3px;
  font-family: Share Tech Mono;
  font-size: 1em;
  background-color: ${config.getTheme('transparent.300')};
  color: ${config.getTheme('neutral.1200')};

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::selection {
    background-color: ${config.getTheme('neutral.300')};
    color: ${config.getTheme('yellow.800')};
  }
`
