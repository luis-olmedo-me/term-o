import configuration from 'libs/configuration'
import styled from 'styled-components'

const theme = configuration.theme

export const SuggestionsWrapper = styled.div`
  overflow-y: scroll;
  max-height: 120px;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Suggestion = styled.span`
  display: block;
  background: ${theme.suggestion.background};
  color: ${theme.suggestion.color};
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  box-sizing: border-box;
  font-size: 16px;
  cursor: pointer;
  transition: padding 0.2s ease-in-out;

  &.selected {
    background: ${theme.suggestion.selected.background};
    color: ${theme.suggestion.selected.color};
    padding: 0 40px;
  }

  &:hover {
    background: ${theme.suggestion.hover.background};
    color: ${theme.suggestion.hover.color};
  }
`
