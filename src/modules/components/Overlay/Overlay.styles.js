import config from 'libs/configuration'
import styled from 'styled-components'

export const OverlayWrapper = styled.div`
  all: initial;
  position: fixed;
  z-index: 100000;
  inset: 0;
  width: 100%;
  pointer-events: none;
  transition: background-color 0.2s ease-in-out;

  background-color: ${({ isHighlighting }) =>
    isHighlighting
      ? config.getTheme('transparent.700')
      : config.getTheme('transparent.000')};
`

export const HighlightedElement = styled.div`
  position: absolute;
  opacity: 0.5;
  background-color: transparent;
  inset: 0;
  width: 100%;
  box-sizing: border-box;
  opacity: ${(props) => (props.isHighlighting ? 1 : 0)};

  &&.horizontal-limit,
  &&.vertical-limit {
    border: dashed ${config.getTheme('blue.800')};
  }
  &&.horizontal-limit {
    border-width: 1px 0;
  }
  &&.vertical-limit {
    border-width: 0 1px;
  }

  &&.box {
    background-color: ${config.getTheme('transparent.150')};
  }
`
