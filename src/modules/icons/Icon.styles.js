import styled from 'styled-components'

export const Icon = styled.svg`
  width: 24px;
  height: 24px;
  vertical-align: middle;
`

export const DirectionableIcon = styled(Icon)`
  transition: transform 0.2s ease-in-out;

  &.right {
    transform: rotate(0);
  }
  &.left {
    transform: rotate(-180deg);
  }
  &.top {
    transform: rotate(90deg);
  }
  &.bottom {
    transform: rotate(-90deg);
  }
`

export const PopupPath = styled.path`
  transition: opacity 0.2s ease-in-out;
  opacity: ${props => (props.active ? 1 : 0)};
`
