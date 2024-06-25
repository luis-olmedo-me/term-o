import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import commandHandlers from '@sidepanel/command-handlers'
import Prompt from '@sidepanel/components/Prompt'
import Logger from '@sidepanel/modules/Logger'
import commandParser from '@src/libs/command-parser'
import * as S from './Terminal.styles'

commandParser.setHandlers(commandHandlers)

export const Terminal = () => {
  const [logs, setLogs] = useState([])
  const inputRef = useRef(null)

  useEffect(function focusOnInputAtFirstTime() {
    focusOnInput()
  }, [])

  useEffect(function addEventsOnCommandParser() {
    const clearLogs = () => setLogs([])

    commandParser.addEventListener('clear', clearLogs)

    return () => commandParser.removeEventListener('clear', clearLogs)
  }, [])

  const focusOnInput = () => {
    inputRef.current.focus()
  }

  const handleEnter = () => {
    const newLog = commandParser.read(value)

    setLogs(oldLogs => [newLog, ...oldLogs])
    focusOnInput()
  }

  return (
    <S.TerminalWrapper onClick={focusOnInput}>
      <Logger logs={logs} />

      <Prompt onEnter={handleEnter} inputRef={inputRef} />
    </S.TerminalWrapper>
  )
}
