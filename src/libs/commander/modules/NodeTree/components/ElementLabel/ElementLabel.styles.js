import styled, { keyframes } from 'styled-components'

export const DefaultWrapper = styled.span`
  position: relative;
  padding-right: ${(props) => props.paddingRight || 7}px;
`

export const Tag = styled.span`
  color: #9ba1a6;
  margin: ${(props) => (props.opening ? '0 0 0 7px' : '0 7px 0 0')};
  line-height: 1.8rem;
`

export const TagName = styled.span`
  color: ${(props) => (props.isHidden ? '#697177' : '#0070f3')};
  line-height: 1.8rem;
`

export const AttributeName = styled.span`
  color: ${(props) => (props.isHidden ? '#9BA1A6' : '#F8C572')};
  line-height: 1.8rem;
`

export const Equal = styled.span`
  color: ${(props) => (props.isHidden ? '#787F85' : '#F6AD37')};
  line-height: 1.8rem;
`

export const AttributeValue = styled.span`
  color: ${(props) => (props.isHidden ? '#787F85' : '#F5A524')};
  line-height: 1.8rem;
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
