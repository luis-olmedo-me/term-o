import styled from 'styled-components'

export const ElementWrapper = styled.span`
  position: relative;
  padding: 5px 40px 5px 10px;
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

export const ThreeDotsOptionsWrapper = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  height: -webkit-fill-available;
`
