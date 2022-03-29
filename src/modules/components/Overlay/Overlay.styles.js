import styled from 'styled-components'

export const OverlayWrapper = styled.div`
  all: initial;
  position: fixed;
  z-index: 100000;
  background-color: ${(props) =>
    props.isHighlighting ? '#00000033' : 'transparent'};
  inset: 0;
  width: 100%;
  pointer-events: none;
  transition: background-color 0.2s ease-in-out;
`

export const HighlightedElement = styled.div`
  position: fixed;
  z-index: 100001;
  opacity: 0.5;
  background-color: transparent;
  inset: 0;
  width: 100%;
  border: 2px dashed #9cf;
  box-sizing: border-box;
`
