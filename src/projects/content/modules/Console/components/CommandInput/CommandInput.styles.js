import configuration from 'libs/configuration'
import styled from 'styled-components'

const theme = configuration.theme
const radius = theme.border.radius

export const Input = styled.input`
  padding: 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  color: ${theme.input.color};
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
    background-color: ${theme.input.selection.background};
    color: ${theme.input.selection.color};
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
  background: ${theme.input.background};
  border-radius: 0 0 ${radius} ${radius};
`

export const Hash = styled.span`
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: end;
  color: ${theme.input.color};
`
