import config from 'libs/configuration'
import styled from 'styled-components'

export const Box = styled.div`
  width: 0.8em;
  height: 0.8em;
  background-color: ${config.getTheme('transparent.350')};
  border: 3px solid ${config.getTheme('transparent.400')};
  border-radius: 0.4em;
  display: inline-block;
  vertical-align: text-bottom;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  &.checked {
    background-color: ${config.getTheme('purple.800')};
  }
`
