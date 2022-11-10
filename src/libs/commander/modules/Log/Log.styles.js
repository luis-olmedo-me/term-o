import config from 'libs/configuration'
import styled from 'styled-components'

const radius = config.getTheme('radius.200')

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
    background-color: ${config.getTheme('neutral.300')};
    color: ${config.getTheme('neutral.1200')};
  }

  &&.element {
    background-color: ${config.getTheme('pink.700')};
    color: ${config.getTheme('neutral.1200')};
  }

  &&.styles {
    background-color: ${config.getTheme('blue.700')};
    color: ${config.getTheme('neutral.1200')};
  }

  &&.error {
    background-color: ${config.getTheme('red.700')};
    color: ${config.getTheme('neutral.1200')};
  }

  &&.info {
    background-color: ${config.getTheme('blue.800')};
    color: ${config.getTheme('neutral.1200')};
  }

  &&.table {
    background-color: ${config.getTheme('purple.700')};
    color: ${config.getTheme('neutral.1200')};
  }

  &&.success {
    background-color: ${config.getTheme('green.700')};
    color: ${config.getTheme('neutral.1200')};
  }

  &&.help {
    background-color: ${config.getTheme('green.700')};
    color: ${config.getTheme('neutral.1200')};
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
    background-color: #00000015;
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
