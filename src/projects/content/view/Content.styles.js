import styled from 'styled-components'

export const ContentWrapper = styled.div`
  position: fixed;
  z-index: 1000000;
  opacity: ${(props) => props.opacity || 0};
`
