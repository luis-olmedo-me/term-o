import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import Input from '../../components/Input'
import Logger from '../../components/Logger'
import * as S from './Terminal.styles'

export const Terminal = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  const handleChange = event => {
    const value = event.target.value

    setValue(value)
  }

  const focusOnInput = () => {
    inputRef.current.focus()
  }

  useEffect(function focusOnInputAtFirstTime() {
    focusOnInput()
  }, [])

  return (
    <S.TerminalWrapper onClick={focusOnInput}>
      <Logger logs={['test', 'test1']} />

      <Input type="text" onChange={handleChange} value={value} prefix="$" inputRef={inputRef} />
    </S.TerminalWrapper>
  )
}
