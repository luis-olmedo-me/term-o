import styled from 'styled-components'

export const ResizerWrapper = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 0;
  position: absolute;
  z-index: 2;
  transition: 0.1s ease-in-out;
  transition-property: background-color, width;

  &&.left,
  &&.right {
    top: 0;
    bottom: 0;
    width: 2px;

    &&:active,
    &&:hover {
      cursor: col-resize;
      background-color: #333;
      width: 8px;
    }
  }
  &&.left {
    left: 0;
  }
  &&.right {
    right: 0;
  }

  &&.top,
  &&.bottom {
    left: 0;
    right: 0;
    height: 6px;

    &&:active,
    &&:hover {
      cursor: row-resize;
      background-color: #333;
      height: 12px;
    }
  }
  &&.top {
    top: 0;
  }
  &&.bottom {
    bottom: 0;
  }
`
