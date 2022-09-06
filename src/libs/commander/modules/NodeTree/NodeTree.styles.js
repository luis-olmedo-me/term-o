import styled from 'styled-components'

export const TreeWrapper = styled.div`
  overflow: scroll;
  white-space: nowrap;
  max-height: 550px;
  font-weight: bold;
  border: solid #00000020;
  border-width: 5px 0;
  border-radius: 3px 0 0 3px;

  &::-webkit-scrollbar {
    display: none;
  }
`
