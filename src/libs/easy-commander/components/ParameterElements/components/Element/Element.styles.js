import styled from 'styled-components'

export const ElementWrapper = styled.span`
  padding: 5px 10px;
  background-color: ${(props) => (props.isHidden ? '#eaeaea' : '#fafafa')};
  color: ${(props) => (props.isHidden ? '#888' : '#0070f3')};
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  flex: auto;
  text-align: center;
  line-height: 1.75;

  &:hover {
    background-color: ${(props) => (props.isHidden ? '#eaeaea' : '#ffdbe7')};
  }
`

export const Specification = styled.span`
  color: ${(props) => (props.isHidden ? '#888' : '#f5a623')};
`
