import styled from 'styled-components'

export const ContentWrapper = styled.div`
  position: fixed;
  z-index: 1000000;
  opacity: ${(props) => props.opacity};
  right: ${(props) => `${props.right}px`};
  left: ${(props) => `${props.left}px`};
  top: ${(props) => `${props.top}px`};
  bottom: ${(props) => `${props.bottom}px`};
  display: flex;
  flex-flow: column;
`

export const ResizerLeft = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;

  &&:hover {
    cursor: col-resize;
    background-color: #aaa;
    width: 8px;
  }
`
