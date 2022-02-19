import styled from 'styled-components'

export const ContentWrapper = styled.div`
  position: fixed;
  z-index: 1000000;
  opacity: ${(props) => props.opacity || 0};
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-flow: column;
`
