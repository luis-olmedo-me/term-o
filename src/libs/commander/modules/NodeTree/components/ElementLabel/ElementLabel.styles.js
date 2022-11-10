import config from 'libs/configuration'
import styled, { keyframes } from 'styled-components'

export const DefaultWrapper = styled.span`
  position: relative;
  padding-right: ${(props) => props.paddingRight || 7}px;
`

export const Tag = styled.span`
  color: ${config.getTheme('neutral.1000')};
  margin: ${(props) => (props.hasPostFix ? '0 7px 0 0' : '0')};
`

export const TagName = styled.span`
  color: ${({ isHidden }) =>
    isHidden ? config.getTheme('neutral.800') : config.getTheme('blue.700')};
`

export const AttributeName = styled.span`
  color: ${({ isHidden }) =>
    isHidden ? config.getTheme('neutral.1000') : config.getTheme('yellow.800')};
`

export const Equal = styled.span`
  color: ${({ isHidden }) =>
    isHidden ? config.getTheme('neutral.900') : config.getTheme('yellow.700')};
`

export const AttributeValue = styled.span`
  color: ${({ isHidden }) =>
    isHidden ? config.getTheme('neutral.900') : config.getTheme('yellow.600')};
`

const birth = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`
export const ChildWrapper = styled.div`
  padding-left: 2ch;
  border-left: 5px solid ${config.getTheme('transparent.300')};
  animation: ${birth} 0.2s ease-in-out;
  transform-origin: top;
`
