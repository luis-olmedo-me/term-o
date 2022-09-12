import styled from 'styled-components'

export const SuggestionsWrapper = styled.div`
  overflow-y: scroll;
  max-height: 120px;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Suggestion = styled.span`
  display: block;
  color: ${({ selected }) => (selected ? '#F8C572' : '#d6d6d6')};
  background-color: ${({ selected }) => (selected ? '#222' : '#111')};
  padding: ${(props) => (props.selected ? '10px 40px' : '10px 30px')};
  display: flex;
  justify-content: space-between;
  height: 40px;
  box-sizing: border-box;
  font-size: 16px;
  cursor: pointer;
  transition: padding 0.2s ease-in-out;

  &:hover {
    background-color: #222;
    color: #f8c572;
  }
`
