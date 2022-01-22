import styled from 'styled-components'

export const Icon = styled.svg`
  width: 24px;
  height: 24px;

  ${(props) => props.cssStyles || ''}
`
