import styled from 'styled-components'
import { CardContainer } from './components/LogCard/LogCard.styles'

export const LogContainer = styled.div`
  &:first-child ${CardContainer}:first-child {
    border-top-left-radius: ${radius};
    border-top-right-radius: ${radius};
  }
  &:last-child ${CardContainer}:last-child {
    border-bottom-left-radius: ${radius};
    border-bottom-right-radius: ${radius};
  }
`
