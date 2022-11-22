import { theme as t } from '@src/helpers/theme.helpers'
import styled from 'styled-components'
import { CardContainer } from './components/LogCard/LogCard.styles'

const radius = t('radius.200')

export const LogContainer = styled.div`
  transition: opacity 0.2s ease-in-out;

  &:first-child ${CardContainer}:first-child {
    border-top-left-radius: ${radius};
    border-top-right-radius: ${radius};
  }
  &:last-child ${CardContainer}:last-child {
    border-bottom-left-radius: ${radius};
    border-bottom-right-radius: ${radius};
  }
`
