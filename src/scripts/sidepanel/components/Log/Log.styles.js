import styled from 'styled-components'

import { theme as t } from '@src/theme/theme.helpers'
import { InputWrapper, Prefix } from '../Input/Input.styles'
import { Line } from '../Prompt/Prompt.styles'

export const LogWrapper = styled.div`
  ${Line} , ${InputWrapper}{
    padding: ${t('space.300')} 0 0;
  }

  ${Prefix} {
    width: auto;
  }
`

export const LogItem = styled.p`
  word-break: break-all;
`
