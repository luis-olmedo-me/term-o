import styled from 'styled-components'

export const Input = styled.input`
  padding: 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  color: #d6d6d6;
  border: none;
  vertical-align: middle;
  background-color: transparent;
  font-family: 'Share Tech Mono', monospace;
  font-size: 16px;

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

export const InputWrapper = styled.div`
  background-color: transparent;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 1;
  border-width: 0 1px 1px;
  background-color: #111;
  border-radius: 0 0 5px 5px;
`

export const Hash = styled.span`
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: end;
  color: #d6d6d6;
`
