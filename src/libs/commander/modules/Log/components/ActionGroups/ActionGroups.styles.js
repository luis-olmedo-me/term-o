import config from 'libs/configuration'
import styled from 'styled-components'

export const Groups = styled.div`
  background-color: ${config.getTheme('transparent.100')};
  color: ${config.getTheme('neutral.1200')};
  display: flex;
  justify-content: center;
`

export const Action = styled.button`
  border: none;
  padding: ${(props) => (props.hasIcon ? '5px 3px' : '5px 10px')};
  cursor: pointer;
  background-color: ${config.getTheme('transparent.200')};
  transition: background-color 0.2s ease-in-out;
  font-family: Share Tech Mono;
  color: inherit;
  font-size: 16px;

  &:hover {
    background-color: ${config.getTheme('transparent.150')};
  }

  &:focus,
  &:active {
    outline: none;
  }

  &&.selected {
    background-color: ${config.getTheme('transparent.450')};
  }

  &&.disabled,
  &&.disabled:hover {
    background-color: ${config.getTheme('transparent.400')};
  }

  &::selection {
    background-color: ${config.getTheme('transparent.300')};
    color: ${config.getTheme('yellow.800')};
  }
`
