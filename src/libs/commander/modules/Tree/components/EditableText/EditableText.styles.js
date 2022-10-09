import styled from 'styled-components'

export const TextInput = styled.input`
  border: none;
  border-radius: 3px;
  font-family: Share Tech Mono;
  margin: 0;
  background-color: #00000033;
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
    background-color: #222;
    color: #f8c572;
  }
`
