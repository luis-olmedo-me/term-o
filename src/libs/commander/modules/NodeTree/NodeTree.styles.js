import styled from 'styled-components'

export const TreeWrapper = styled.div`
  background: #00000020;
  border-radius: 3px;
  overflow: scroll;
  white-space: nowrap;
  max-height: 550px;
  font-weight: bold;

  &::-webkit-scrollbar {
    display: none;
  }
`
