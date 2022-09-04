import styled from 'styled-components'

export const TagWrapper = styled.span`
  --tag-background-color: ${(props) =>
    props.isNodeObjetive ? '#ffeecc' : '#fafafa'};
  background: var(--tag-background-color);
  color: #17c964;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease-in-out;
  display: inline-block;
  height: 1.8rem;
  line-height: 1.8rem;

  &:only-child {
    margin: 0 7px;
  }
`

export const GapNodesWrapper = styled.div`
  margin: 10px 0;
`
export const ActionButtonText = styled.div`
  transition: transform 0.2s ease-in-out;
  display: inline-block;
  transform: rotate(${(props) => (props.isOpen ? '-90deg' : '90deg')});
`
