import styled from 'styled-components'

export const TagWrapper = styled.span`
  background: #fafafa;
  padding: 3px 7px;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  padding-right: ${(props) => props.paddingRight || 3}px;
`

export const GapNodesWrapper = styled.div`
  margin: 10px 0;
`
export const ActionButtonText = styled.div`
  transition: transform 0.2s ease-in-out;
  display: inline-block;
  transform: rotate(${(props) => (props.isOpen ? '-90deg' : '90deg')});
`
