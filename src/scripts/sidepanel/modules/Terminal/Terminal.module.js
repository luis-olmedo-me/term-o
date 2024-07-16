import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { useTheme } from 'styled-components'

import useStorage from '@background/hooks/useStorage'
import commandHandlers from '@sidepanel/command-handlers'
import Prompt from '@sidepanel/components/Prompt'
import { CAN_COPY_ON_SELECTION, PSO } from '@sidepanel/config'
import { getCurrentTab } from '@sidepanel/helpers/event.helpers'
import Logger from '@sidepanel/modules/Logger'
import commandParser from '@src/libs/command-parser'
import * as S from './Terminal.styles'

commandParser.setHandlers(commandHandlers)

export const Terminal = () => {
  const [logs, setLogs] = useState([])
  const [tab, setTab] = useState(null)
  const inputRef = useRef(null)
  const loggerRef = useRef(null)

  const theme = useTheme()

  const [aliases] = useStorage({
    namespace: 'local',
    key: 'aliases',
    defaultValue: []
  })

  useEffect(function focusOnInputAtFirstTime() {
    focusOnInput()
  }, [])

  useEffect(function handlePanelFocus() {
    const updateTab = () => getCurrentTab().then(setTab)

    updateTab()
    window.addEventListener('focus', updateTab)

    return () => window.removeEventListener('focus', updateTab)
  }, [])

  useEffect(
    function expectAliasChanges() {
      commandParser.setAliases(aliases)
    },
    [aliases]
  )

  useEffect(
    function addExternalDataOnNewCommands() {
      const clearLogs = () => setLogs([])
      const appendData = command => command.appendsData({ tab, setTab, theme })

      commandParser.addEventListener('on-create-dom', appendData)
      commandParser.addEventListener('on-create-style', appendData)
      commandParser.addEventListener('on-create-storage', appendData)
      commandParser.addEventListener('on-create-tabs', appendData)
      commandParser.addEventListener('on-create-theme', appendData)
      commandParser.addEventListener('on-create-clear', clearLogs)

      return () => {
        commandParser.removeEventListener('on-create-dom', appendData)
        commandParser.removeEventListener('on-create-style', appendData)
        commandParser.removeEventListener('on-create-storage', appendData)
        commandParser.removeEventListener('on-create-tabs', appendData)
        commandParser.removeEventListener('on-create-theme', appendData)
        commandParser.removeEventListener('on-create-clear', clearLogs)
      }
    },
    [tab, theme]
  )

  const focusOnInput = () => {
    const selection = window.getSelection()
    const selectedText = selection.toString()

    if (CAN_COPY_ON_SELECTION && selectedText) navigator.clipboard.writeText(selectedText)
    inputRef.current?.focus()
  }

  const handleEnter = value => {
    const newLog = commandParser.read(value)

    setLogs(oldLogs => [newLog, ...oldLogs])
    focusOnInput()
  }

  return (
    <S.TerminalWrapper onMouseUp={focusOnInput}>
      <Logger logs={logs} loggerRef={loggerRef} />

      <Prompt onEnter={handleEnter} inputRef={inputRef} tab={tab} pso={PSO} />
    </S.TerminalWrapper>
  )
}
