import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'
import { LogCard } from './components/LogCard/LogCard.component'
import { CardContainer } from './components/LogCard/LogCard.styles'

const radius = t('radius.200')

export const LogWrapper = styled.div`
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out,
    border-radius 0.2s ease-in-out;
  cursor: auto;
  width: 100%;
  border-radius: 0;

  &&.rounded-t {
    border-top-left-radius: ${radius};
    border-top-right-radius: ${radius};
  }
  &&.rounded-b {
    border-bottom-left-radius: ${radius};
    border-bottom-right-radius: ${radius};
  }

  &&.command {
    background-color: ${t('neutral.300')};
    color: ${t('neutral.1200')};
  }

  &&.element {
    background-color: ${t('pink.700')};
    color: ${t('neutral.1200')};
  }

  &&.styles {
    background-color: ${t('blue.700')};
    color: ${t('neutral.1200')};
  }

  &&.error {
    background-color: ${t('red.700')};
    color: ${t('neutral.1200')};
  }

  &&.info {
    background-color: ${t('blue.800')};
    color: ${t('neutral.1200')};
  }

  &&.table {
    background-color: ${t('purple.700')};
    color: ${t('neutral.1200')};
  }

  &&.success {
    background-color: ${t('green.700')};
    color: ${t('neutral.1200')};
  }

  &&.help {
    background-color: ${t('yellow.400')};
    color: ${t('neutral.1200')};
  }

  &&.code {
    background-color: ${t('cyan.700')};
    color: ${t('neutral.1200')};
  }
`

export const Hash = styled.span`
  margin-right: 1ch;
  min-width: 1em;
  display: inline-block;
  text-align: center;

  & + span {
    vertical-align: middle;
  }
`

export const LogContent = styled.div`
  padding: 10px;
`
export const Shadow = styled.div`
  &.shadow {
    padding: 10px;
    background-color: ${t('transparent.200')};
    border-radius: ${t('radius.200')};
  }
`

export const ScrolledLogContent = styled.div`
  max-height: 500px;
  overflow-y: scroll;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const LogContainer = styled.div`
  &:first-child ${CardContainer}:first-child {
    border-top-left-radius: ${radius};
    border-top-right-radius: ${radius};
  }
  &:last-child ${CardContainer}:last-child {
    border-bottom-left-radius: ${radius};
    border-bottom-right-radius: ${radius};
  }
`
