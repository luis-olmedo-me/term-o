import styled from 'styled-components'

export const ElementWrapper = styled.span`
  padding: 2px 10px;
  background-color: ${(props) => (props.isHidden ? '#6e5698' : '#9e86c8')};
  color: #d6d6d6;
  border-radius: 4px;
`
