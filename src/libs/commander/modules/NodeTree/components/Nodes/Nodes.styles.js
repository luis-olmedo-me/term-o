import styled from 'styled-components'

export const TagWrapper = styled.span`
  background: #fafafa;
  padding: 3px 7px;
  border-radius: 3px;
  line-height: 2rem;
  cursor: pointer;
  position: relative;
  padding-right: ${(props) => props.paddingRight || 3}px;
`
