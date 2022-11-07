import styled from 'styled-components'

export const Input = styled.input`
  padding: 6px 10px;
  width: -webkit-fill-available;
  border: none;
  border-radius: 3px;
  font-family: Share Tech Mono;
  font-size: 1em;
  color: #fafafa;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::selection {
    background-color: #222;
    color: #f8c572;
  }
`
