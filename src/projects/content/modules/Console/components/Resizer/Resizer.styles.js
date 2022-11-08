import configuration from 'libs/configuration'
import styled from 'styled-components'

const theme = configuration.theme
const radius = theme.border.radius

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
      background: ${theme.resizer.background};
      width: 8px;
    }

    &&:active,
    &&:focus {
      outline: none;
    }
  }
  &&.left {
    left: 0;
    border-radius: ${radius} 0 0 ${radius};
    cursor: w-resize;
  }
  &&.right {
    right: 0;
    border-radius: 0 ${radius} ${radius} 0;
    cursor: e-resize;
  }

  &&.top,
  &&.bottom {
    left: 0;
    right: 0;
    height: 6px;
    width: 100%;

    &&:active,
    &&:hover {
      background-color: ${theme.resizer.background};
      height: 12px;
    }

    &&:active,
    &&:focus {
      outline: none;
    }
  }
  &&.top {
    top: 0;
    border-radius: ${radius} ${radius} 0 0;
    cursor: n-resize;
  }
  &&.bottom {
    bottom: 0;
    border-radius: 0 0 ${radius} ${radius};
    cursor: s-resize;
  }
`
