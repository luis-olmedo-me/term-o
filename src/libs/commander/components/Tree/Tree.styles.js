import styled from 'styled-components'

export const CollapseButton = styled.button`
  margin: 0 0 3px 5px;
  font-family: Coda;
  border: none;
  background: #00000020;
  color: ${(props) => (props.disabled ? '#ffffff60' : '#ffffff')};
  border-radius: 3px;
  vertical-align: middle;
  cursor: pointer;
  line-height: 1.2em;
`
export const TwoDots = styled.span`
  color: orange;
`
