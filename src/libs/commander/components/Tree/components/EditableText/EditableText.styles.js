import styled from 'styled-components'

export const TextInput = styled.input`
  border: none;
  border-radius: 3px;
  font-family: monospace;
  margin: 0;
  background-color: #00000033;
  color: white;
  min-width: 3ch;
  text-align: center;

  &:focus,
  &:active {
    outline: none;
  }
`
