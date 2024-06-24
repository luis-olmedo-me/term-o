import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import commandHandlers from '@sidepanel/command-handlers'
import Input from '@sidepanel/components/Input'
import Logger from '@sidepanel/modules/Logger'
import commandParser from '@src/libs/command-parser'
import * as S from './Terminal.styles'

commandParser.setHandlers(commandHandlers)

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
      console.log('💬  newLog:', newLog)

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
