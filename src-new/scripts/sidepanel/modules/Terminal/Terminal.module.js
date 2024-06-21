import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import Input from '@sidepanel/components/Input'
import Logger from '@sidepanel/modules/Logger'
import * as S from './Terminal.styles'

const mockedLogs = [
  {
    id: '123',
    command: 'dom -g *'
  }
]

export const Terminal = () => {
  const [value, setValue] = useState('')
  const [logs, setLogs] = useState(mockedLogs)
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
      <Logger logs={logs} />

      <Input type="text" onChange={handleChange} value={value} prefix="$" inputRef={inputRef} />
    </S.TerminalWrapper>
  )
}
