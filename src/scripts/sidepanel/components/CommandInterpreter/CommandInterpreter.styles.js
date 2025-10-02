import styled from 'styled-components'

import { InputWrapper, Prefix } from '@src/components/Input'
import { theme as t } from '@src/libs/themer'
import { Line } from '../Prompt/Prompt.styles'

export const CommandInterpreterWrapper = styled.div`
  ${Line} , ${InputWrapper} {
    padding: ${t('space.300')} 0 0;
  }

  ${Prefix} {
    width: auto;
  }
`

export const CommandInterpreterItem = styled.p`
  word-break: break-all;
  margin: 0;
`
