import styled from 'styled-components'

export const SuggestionsWrapper = styled.div`
  overflow-y: scroll;
  max-height: 120px;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Suggestion = styled.span`
  padding: 10px 30px;
  display: block;
  color: ${({ selected }) => (selected ? '#F8C572' : '#d6d6d6')};
  background-color: ${({ selected }) => (selected ? '#222' : '#111')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  display: flex;
  justify-content: space-between;
  height: 40px;
  box-sizing: border-box;
  font-size: 16px;
`
