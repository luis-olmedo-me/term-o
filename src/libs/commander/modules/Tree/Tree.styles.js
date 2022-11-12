import { theme as t } from 'src/helpers/theme.helpers'
import styled from 'styled-components'

export const CollapseButton = styled.button`
  margin: 0 0 3px 5px;
  font-family: Share Tech Mono;
  border: none;
  background-color: ${t('transparent.300')};
  color: ${t('neutral.1200')};
  border-radius: ${t('radius.200')};
  vertical-align: middle;
  cursor: pointer;
  line-height: 1.2em;

  &.disabled {
    color: ${t('transparent.650')};
  }
`
export const TwoDots = styled.span`
  color: orange;
`
