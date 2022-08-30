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
  border-left: 1px solid #00000020;
  animation: ${birth} 0.2s ease-in-out;
  transform-origin: top;
`

export const ActionButtons = styled.div`
  display: inline-block;
  height: -webkit-fill-available;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  border-left: 1px solid #00000015;
`
export const ActionButton = styled.button`
  height: -webkit-fill-available;
  background-color: transparent;
  border: none;
  color: black;
  font-weight: bold;
  font-family: Coda;
  padding: 0 10px;
  cursor: pointer;

  &&:last-child {
    border-radius: 0 3px 3px 0;
  }
  &&:disabled {
    background-color: #00000015;
    color: #aaa;
  }
`
