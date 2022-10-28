import styled from 'styled-components'

export const Icon = styled.svg`
  width: 24px;
  height: 24px;

  ${(props) => props.cssStyles || ''}
`

export const DirectionableIcon = styled.svg`
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
