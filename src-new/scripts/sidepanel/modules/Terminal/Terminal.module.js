import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import Input from '@sidepanel/components/Input'
import Logger from '@sidepanel/modules/Logger'
import commandParser from 'scripts/sidepanel/libs/CommandParser'
import Log from 'scripts/sidepanel/libs/Log'
import * as S from './Terminal.styles'

const mockedLogs = [
  {
    id: 0,
    command: 'dom -g *'
  }
]

export const Terminal = () => {
  const [value, setValue] = useState('')
  const [logs, setLogs] = useState(mockedLogs)
  const inputRef = useRef(null)

  const focusOnInput = () => {
    inputRef.current.focus()
  }

  const handleChange = event => {
    const value = event.target.value

    setValue(value)
  }
  const handleKeyDown = event => {
    const key = event.key

    if (key === 'Enter') {
      const newLog = commandParser.read(value)
      console.log('💬  newLog:', newLog)

      setLogs([newLog, ...logs])
      setValue('')
      focusOnInput()
    }
  }

  useEffect(function focusOnInputAtFirstTime() {
    focusOnInput()
  }, [])

  return (
    <S.TerminalWrapper onClick={focusOnInput}>
      <Logger logs={logs} />

      <Input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        prefix="$"
        inputRef={inputRef}
      />
    </S.TerminalWrapper>
  )
}
