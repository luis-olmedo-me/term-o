import styled from 'styled-components'

import { theme as t } from '@src/theme/theme.helpers'
import { InputWrapper, Prefix } from '../Input/Input.styles'
import { Decoration } from '../Prompt/Prompt.styles'

export const LogWrapper = styled.div`
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};

  ${Decoration} {
    padding: ${t('space.300')} 0 0;
  }

  ${InputWrapper} {
    padding: ${t('space.300')} 0;
  }

  ${Prefix} {
    width: auto;
  }
`

export const LogItem = styled.p`
  word-break: break-all;
`
