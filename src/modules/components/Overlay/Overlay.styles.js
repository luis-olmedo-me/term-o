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
  opacity: ${(props) => (props.isHighlighting ? 0.2 : 0)};
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
`
