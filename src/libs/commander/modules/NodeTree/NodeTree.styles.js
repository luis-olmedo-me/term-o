import styled from 'styled-components'

export const TreeWrapper = styled.div`
  overflow: scroll;
  white-space: nowrap;
  max-height: 537px;
  font-weight: bold;
  border-radius: 3px 0 0 3px;
  scroll-snap-type: block;

  &::-webkit-scrollbar {
    display: none;
  }
`
