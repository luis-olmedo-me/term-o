import config from 'libs/configuration'
import styled from 'styled-components'

export const CollapseButton = styled.button`
  margin: 0 0 3px 5px;
  font-family: Share Tech Mono;
  border: none;
  background-color: ${config.getTheme('transparent.300')};
  color: ${config.getTheme('neutral.1200')};
  border-radius: ${config.getTheme('radius.200')};
  vertical-align: middle;
  cursor: pointer;
  line-height: 1.2em;

  &.disabled {
    color: ${config.getTheme('transparent.650')};
  }
`
export const TwoDots = styled.span`
  color: orange;
`
