import styled from 'styled-components'

export const LogWrapper = styled.div`
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`

export const LogItem = styled.p`
  word-break: break-all;
`
