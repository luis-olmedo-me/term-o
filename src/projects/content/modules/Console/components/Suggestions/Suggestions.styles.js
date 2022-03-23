import styled from 'styled-components'

export const SuggestionsWrapper = styled.div`
  overflow-y: scroll;
  max-height: 120px;
  border-top: 1px solid #333;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Suggestion = styled.span`
  padding: 10px 30px;
  display: block;
  color: ${({ selected }) => (selected ? '#9cf' : '#d6d6d6')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  display: flex;
  justify-content: space-between;
  height: 40px;
  box-sizing: border-box;
  font-size: 16px;
`
