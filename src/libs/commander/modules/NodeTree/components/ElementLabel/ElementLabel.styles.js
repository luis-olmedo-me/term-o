import styled, { keyframes } from 'styled-components'

export const DefaultWrapper = styled.span`
  position: relative;
  padding-right: ${(props) => props.paddingRight || 7}px;
`

export const Tag = styled.span`
  color: #9ba1a6;
`

export const TagName = styled.span`
  color: ${(props) => (props.isHidden ? '#697177' : '#0070f3')};
`

export const AttributeName = styled.span`
  color: ${(props) => (props.isHidden ? '#9BA1A6' : '#F8C572')};
`

export const Equal = styled.span`
  color: ${(props) => (props.isHidden ? '#787F85' : '#F6AD37')};
`

export const AttributeValue = styled.span`
  color: ${(props) => (props.isHidden ? '#787F85' : '#F5A524')};
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
  border-left: 5px solid #00000020;
  animation: ${birth} 0.2s ease-in-out;
  transform-origin: top;
`
