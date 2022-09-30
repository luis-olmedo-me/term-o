import styled from 'styled-components'

export const UnsortedList = styled.ul`
  margin: 0 0 1em 0;
  padding-left: 1.5em;

  &:last-child {
    margin-bottom: 0;
  }
`
export const ListItem = styled.li`
  margin: 0 0 0.5em 0;

  &:last-child {
    margin-bottom: 0;
  }
`

export const HelpWrapper = styled.div`
  max-height: 537px;
  overflow-y: scroll;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    display: none;
  }
`
