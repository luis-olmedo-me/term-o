import * as React from 'preact'
import { useState } from 'preact/hooks'

import Input from '../../components/Input'
import Logger from '../../components/Logger'
import * as S from './Terminal.styles'

export const Terminal = () => {
  const [value, setValue] = useState('')

  const handleChange = event => {
    const value = event.target.value

    setValue(value)
  }

  return (
    <S.TerminalWrapper>
      <Logger logs={['test', 'test1']} />

      <Input type="text" onChange={handleChange} value={value} prefix="$" />
    </S.TerminalWrapper>
  )
}
