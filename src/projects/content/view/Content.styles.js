import styled from 'styled-components'

export const ContentWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 1000000;
  pointer-events: none;
  transform: translateZ(0);
  background-color: rgba($color: #000000, $alpha: 0.15);
  top: ${(props) => props.top || 0}px;
  opacity: ${(props) => props.opacity || 0};
`

export const selectionIconStyles = `
  width: 12px;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
  padding: 4px 1px;
`
