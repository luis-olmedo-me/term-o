import styled from 'styled-components'

export const OverlayWrapper = styled.div`
  all: initial;
  position: fixed;
  z-index: 100000;
  font-family: 'Coda', monospace;
  opacity: 0.5;
  background-color: #000;
  height: fill;
  inset: 0;
  width: 100%;
  opacity: ${(props) => (props.isHighlighting ? 0.5 : 0)};
  pointer-events: none;
`
