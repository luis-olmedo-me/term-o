import { theme as t } from 'src/helpers/theme.helpers'
import styled from 'styled-components'

const radius = t('radius.200')

export const LogWrapper = styled.div`
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
  cursor: auto;
  width: 100%;

  &:first-child {
    border-radius: ${radius} ${radius} 0 0;
  }
  &:last-child {
    border-radius: 0 0 ${radius} ${radius};
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
  word-break: break-all;
`
export const Shadow = styled.div`
  &.shadow {
    padding: 10px;
    background-color: ${t('transparent.200')};
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
