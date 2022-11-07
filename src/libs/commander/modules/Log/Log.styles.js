import configuration from 'libs/configuration'
import styled from 'styled-components'

const theme = configuration.theme
const radius = theme.logs.border.radius

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
    background: ${theme.logs.command.background};
    color: ${theme.logs.command.color};
  }

  &&.element {
    background: ${theme.logs.elements.background};
    color: ${theme.logs.elements.color};
  }

  &&.styles {
    background: ${theme.logs.stylesheet.background};
    color: ${theme.logs.stylesheet.color};
  }

  &&.error {
    background: ${theme.logs.error.background};
    color: ${theme.logs.error.color};
  }

  &&.info {
    background: ${theme.logs.info.background};
    color: ${theme.logs.info.color};
  }

  &&.table {
    background: ${theme.logs.table.background};
    color: ${theme.logs.table.color};
  }

  &&.success {
    background: ${theme.logs.success.background};
    color: ${theme.logs.success.color};
  }

  &&.help {
    background: ${theme.logs.help.background};
    color: ${theme.logs.help.color};
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
