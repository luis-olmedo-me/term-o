import configuration from 'libs/configuration'
import styled from 'styled-components'

const theme = configuration.theme

export const Groups = styled.div`
  background: ${theme.logs.actions.background};
  color: ${theme.logs.actions.color};
  display: flex;
  justify-content: center;
`

export const Action = styled.button`
  border: none;
  padding: ${(props) => (props.hasIcon ? '5px 3px' : '5px 10px')};
  cursor: pointer;
  background: ${theme.logs.action.background};
  transition: background-color 0.2s ease-in-out;
  font-family: Share Tech Mono;
  color: inherit;
  font-size: 16px;

  &:hover {
    background-color: ${theme.logs.action.hover.background};
  }

  &:focus,
  &:active {
    outline: none;
  }

  &&.selected {
    background-color: ${theme.logs.action.selected.background};
  }

  &&.disabled {
    background-color: ${theme.logs.action.disabled.background};

    &&:hover {
      background-color: ${theme.logs.action.disabled.background};
    }
  }

  &::selection {
    background-color: ${theme.logs.action.selection.background};
    color: ${theme.logs.action.selection.color};
  }
`
