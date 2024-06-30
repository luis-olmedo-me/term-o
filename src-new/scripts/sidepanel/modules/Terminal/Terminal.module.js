import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import commandHandlers from '@sidepanel/command-handlers'
import Prompt from '@sidepanel/components/Prompt'
import { CAN_COPY_ON_SELECTION } from '@sidepanel/config'
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
  const loggerRef = useRef(null)

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

    commandParser.addEventListener('on-create-clear', clearLogs)

    return () => commandParser.removeEventListener('on-create-clear', clearLogs)
  }, [])

  useEffect(
    function addExternalDataOnNewCommands() {
      const appendTab = command => command.appendsData({ tab })

      commandParser.addEventListener('on-create-dom', appendTab)
      commandParser.addEventListener('on-create-storage', appendTab)

      return () => {
        commandParser.removeEventListener('on-create-dom', appendTab)
        commandParser.removeEventListener('on-create-storage', appendTab)
      }
    },
    [tab]
  )

  const focusOnInput = () => {
    const selection = window.getSelection()
    const selectedText = selection.toString()

    if (!selectedText) inputRef.current?.focus()
    else if (CAN_COPY_ON_SELECTION) navigator.clipboard.writeText(selectedText)
  }

  const handleEnter = value => {
    const newLog = commandParser.read(value)
    const isInvalidUrl = invalidURLsStarts.some(invalidUrl => tab.url.startsWith(invalidUrl))

    if (isInvalidUrl) newLog.throw('Term-o is unable to execute commands on this page.')

    setLogs(oldLogs => [newLog, ...oldLogs])
    focusOnInput()
  }

  return (
    <S.TerminalWrapper onMouseUp={focusOnInput}>
      <Logger logs={logs} loggerRef={loggerRef} />

      <Prompt onEnter={handleEnter} inputRef={inputRef} tab={tab} pso="On {origin}" />
    </S.TerminalWrapper>
  )
}
