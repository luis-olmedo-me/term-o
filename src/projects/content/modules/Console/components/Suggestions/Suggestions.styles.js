import config from 'libs/configuration'
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
  background-color: ${config.getTheme('neutral.100')};
  color: ${config.getTheme('neutral.1200')};
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  box-sizing: border-box;
  font-size: 16px;
  cursor: pointer;
  transition: padding 0.2s ease-in-out;

  &.selected {
    background-color: ${config.getTheme('neutral.300')};
    color: ${config.getTheme('yellow.800')};
    padding: 0 40px;
  }

  &:hover {
    background-color: ${config.getTheme('neutral.300')};
    color: ${config.getTheme('yellow.800')};
  }
`
