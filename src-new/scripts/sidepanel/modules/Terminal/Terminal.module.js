import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import commandHandlers from '@sidepanel/command-handlers'
import Prompt from '@sidepanel/components/Prompt'
import Logger from '@sidepanel/modules/Logger'
import commandParser from '@src/libs/command-parser'
import { getCurrentTab } from 'scripts/sidepanel/helpers/event.helpers'
import * as S from './Terminal.styles'

commandParser.setHandlers(commandHandlers)

export const Terminal = () => {
  const [logs, setLogs] = useState([])
  const [tab, setTab] = useState(null)
  const inputRef = useRef(null)

  useEffect(function focusOnInputAtFirstTime() {
    focusOnInput()

    window.addEventListener('focus', () => getCurrentTab().then(setTab))
  }, [])

  useEffect(function addEventsOnCommandParser() {
    const clearLogs = () => setLogs([])

    commandParser.addEventListener('clear', clearLogs)

    return () => commandParser.removeEventListener('clear', clearLogs)
  }, [])

  const focusOnInput = () => {
    inputRef.current?.focus()
  }

  const handleEnter = value => {
    const newLog = commandParser.read(value).execute()

    setLogs(oldLogs => [newLog, ...oldLogs])
    focusOnInput()
  }

  const hasTab = Boolean(tab)

  return (
    <S.TerminalWrapper onClick={focusOnInput}>
      <Logger logs={logs} />

      {hasTab && (
        <Prompt onEnter={handleEnter} inputRef={inputRef} pso={`On ${new URL(tab.url).origin}`} />
      )}
    </S.TerminalWrapper>
  )
}
