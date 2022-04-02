import styled from 'styled-components'

export const OverlayWrapper = styled.div`
  all: initial;
  position: fixed;
  z-index: 100000;
  background-color: ${(props) =>
    props.isHighlighting ? '#00000077' : 'transparent'};
  inset: 0;
  width: 100%;
  pointer-events: none;
  transition: background-color 0.2s ease-in-out;
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
    border: dashed #9cf;
  }
  &&.horizontal-limit {
    border-width: 1px 0;
  }
  &&.vertical-limit {
    border-width: 0 1px;
  }

  &&.box {
    background-color: #99ccff33;
  }
`
