import styled from 'styled-components'

export const SuggestionsWrapper = styled.div`
  border-bottom: 1px solid #505050;
  overflow-y: scroll;
  max-height: 108px;
`

export const Suggestion = styled.span`
  padding: 10px 30px;
  display: block;
  color: ${({ selected }) => (selected ? '#9cf' : '#d6d6d6')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  display: flex;
  justify-content: space-between;
`
