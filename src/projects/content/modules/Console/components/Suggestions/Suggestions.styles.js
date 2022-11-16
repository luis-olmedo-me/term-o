import { theme as t } from '@src/helpers/theme.helpers'
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
  background-color: ${t('neutral.100')};
  color: ${t('neutral.1200')};
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  box-sizing: border-box;
  font-size: 16px;
  cursor: pointer;
  transition: padding 0.2s ease-in-out;

  &.selected {
    background-color: ${t('neutral.300')};
    color: ${t('yellow.800')};
    padding: 0 40px;
  }

  &:hover {
    background-color: ${t('neutral.200')};
    color: ${t('yellow.800')};
  }
`
