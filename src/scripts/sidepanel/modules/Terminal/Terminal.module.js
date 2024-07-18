import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { useTheme } from 'styled-components'

import useStorage from '@background/hooks/useStorage'
import commandHandlers, { getCurrentTab } from '@sidepanel/command-handlers'
import Prompt from '@sidepanel/components/Prompt'
import { CAN_COPY_ON_SELECTION } from '@sidepanel/config'
import Logger from '@sidepanel/modules/Logger'
import commandParser from '@src/libs/command-parser'
import { getColor as C } from '@src/theme/theme.helpers'
import * as S from './Terminal.styles'

const formatter = value => `${C`red`}${value}`

commandParser.setFormatter(formatter)
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

  const focusOnInput = () => {
    const selection = window.getSelection()
    const selectedText = selection.toString()

    if (CAN_COPY_ON_SELECTION && selectedText) navigator.clipboard.writeText(selectedText)
    inputRef.current?.focus()
  }

  const clearLogs = exception => setLogs(exception ? [exception] : [])

  const handleEnter = value => {
    const newLog = commandParser.read(value)
    newLog.appendsData({ tab, setTab, theme, clearLogs })

    setLogs(oldLogs => [newLog, ...oldLogs])
    focusOnInput()
  }

  return (
    <S.TerminalWrapper onMouseUp={focusOnInput}>
      <Logger logs={logs} loggerRef={loggerRef} />

      <Prompt onEnter={handleEnter} inputRef={inputRef} tab={tab} />
    </S.TerminalWrapper>
  )
}
