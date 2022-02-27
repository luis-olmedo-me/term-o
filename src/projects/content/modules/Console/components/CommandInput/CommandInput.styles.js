import styled from 'styled-components'

export const Input = styled.input`
  padding: 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  color: #d6d6d6;
  border: none;
  vertical-align: middle;
  background-color: #2e2e2e;

  &:active,
  &:focus,
  &:focus-visible {
    outline: none;
  }
`

export const InputWrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid #505050;
  background-color: #2e2e2e;
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 1;
`

export const Hash = styled.span`
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: end;
  color: #d6d6d6;
`
