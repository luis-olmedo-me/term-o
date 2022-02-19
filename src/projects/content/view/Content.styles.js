import styled from 'styled-components'

export const ContentWrapper = styled.div`
  position: fixed;
  z-index: 1000000;
  opacity: ${(props) => props.opacity};
  pointer-events: ${(props) => (props.opacity === 0 ? 'none' : 'all')};
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

export const ResizerRight = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 2px;

  &&:hover {
    cursor: col-resize;
    background-color: #aaa;
    width: 8px;
  }
`

export const ResizerTop = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;

  &&:hover {
    cursor: row-resize;
    background-color: #aaa;
    height: 8px;
  }
`

export const ResizerBottom = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;

  &&:hover {
    cursor: row-resize;
    background-color: #aaa;
    height: 8px;
  }
`
