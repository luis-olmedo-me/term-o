import styled from 'styled-components'

export const ElementWrapper = styled.span`
  padding: 2px 10px;
  background-color: ${(props) => (props.isHidden ? '#bdbdbd' : '#ededed')};
  color: #707070;
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 0 0 2px #a0a0a0;
  position: relative;

  &:hover {
    box-shadow: 0 0 0 4px #a0a0a0;
  }

  &&::after {
    content: '';
    position: absolute;
    height: 10px;
    width: 10px;
    background-color: aliceblue;
  }
`
