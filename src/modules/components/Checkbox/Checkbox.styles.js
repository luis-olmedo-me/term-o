import styled from 'styled-components'

export const Box = styled.div`
  width: 0.8em;
  height: 0.8em;
  background-color: #ffffff20;
  border: 3px solid #00000045;
  border-radius: 4px;
  display: inline-block;
  vertical-align: text-bottom;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  &.checked {
    background-color: #0072f5;
  }
`
