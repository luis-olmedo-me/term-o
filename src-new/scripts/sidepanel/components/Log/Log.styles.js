import { theme as t } from '@src/theme/theme.helpers'
import styled from 'styled-components'

export const LogWrapper = styled.div`
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`

export const LogItem = styled.p`
  word-break: break-all;
`

export const ColoredText = styled.span`
  color: ${({ color }) => color};

  &::selection {
    color: ${t('green.A200')};
    background-color: ${t('grey.800')};
  }
`
