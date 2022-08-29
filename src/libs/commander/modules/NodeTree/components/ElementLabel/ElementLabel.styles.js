import styled from 'styled-components'

export const DefaultWrapper = styled.span('')

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

export const ChildWrapper = styled.div`
  padding-left: 2ch;
  border-left: 1px solid #00000020;
`

export const DirectionSign = styled.span`
  margin-left: 10px;
  border-left: 2px solid ${(props) => (props.disabled ? '#9BA1A6' : '#787f85')};
  padding: 0 3px 0 10px;
  color: ${(props) => (props.disabled ? '#9BA1A6' : '#787f85')};
`
