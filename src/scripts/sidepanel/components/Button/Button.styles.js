// import { theme as t } from '@src/libs/themer'
import styled from 'styled-components'

export const ButtonWrapper = styled.button`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
`
