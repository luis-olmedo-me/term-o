import styled from 'styled-components'

export const ElementWrapper = styled.span`
  padding: 2px 10px;
  background-color: ${(props) => (props.isHidden ? '#cbbdbd' : '#fbeded')};
  color: #707070;
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 0 0 2px #a0a0a0;
  flex: auto;
  text-align: center;
  line-height: 1.75;

  &:hover {
    box-shadow: 0 0 0 4px #a0a0a0;
  }
`
