import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import Input from '@sidepanel/components/Input'
import Logger from '@sidepanel/modules/Logger'
import commandParser from 'scripts/sidepanel/libs/CommandParser'
import * as S from './Terminal.styles'

export const Terminal = () => {
  const [value, setValue] = useState('')
  const [logs, setLogs] = useState([])
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

      setLogs(oldLogs => [newLog, ...oldLogs])
      setValue('')
      focusOnInput()
    }
  }

  useEffect(function focusOnInputAtFirstTime() {
    focusOnInput()
  }, [])

  useEffect(function addEventsOnCommandParser() {
    const clearLogs = () => setLogs([])

    commandParser.addEventListener('clear', clearLogs)

    return () => {
      commandParser.removeEventListener('clear', clearLogs)
    }
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
