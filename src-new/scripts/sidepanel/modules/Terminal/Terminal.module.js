import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import commandHandlers from '@sidepanel/command-handlers'
import Prompt from '@sidepanel/components/Prompt'
import Logger from '@sidepanel/modules/Logger'
import { invalidURLsStarts } from '@src/constants/events.constants'
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
  }, [])

  useEffect(function handlePanelFocus() {
    const updateTab = () => getCurrentTab().then(setTab)

    updateTab()
    window.addEventListener('focus', updateTab)

    return () => window.removeEventListener('focus', updateTab)
  }, [])

  useEffect(function clearLogsOnClearCommand() {
    const clearLogs = () => setLogs([])

    commandParser.addEventListener('before-clear', clearLogs)

    return () => commandParser.removeEventListener('before-clear', clearLogs)
  }, [])

  useEffect(
    function addExternalDataOnNewCommands() {
      const appendTab = command => command.appendsData({ tab })

      commandParser.addEventListener('before-dom', appendTab)

      return () => commandParser.removeEventListener('before-dom', appendTab)
    },
    [tab]
  )

  const focusOnInput = () => {
    inputRef.current?.focus()
  }

  const handleEnter = value => {
    const newLog = commandParser.read(value).execute()

    setLogs(oldLogs => [newLog, ...oldLogs])
    focusOnInput()
  }

  const isInvalidUrl = !tab || invalidURLsStarts.some(invalidUrl => tab.url.startsWith(invalidUrl))

  return (
    <S.TerminalWrapper onClick={focusOnInput} aria-disabled={isInvalidUrl}>
      <Logger logs={logs} />

      <Prompt onEnter={handleEnter} inputRef={inputRef} tab={tab} pso="On {origin}" />
    </S.TerminalWrapper>
  )
}
