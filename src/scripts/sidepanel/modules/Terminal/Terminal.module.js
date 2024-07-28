import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import useStorage from '@background/hooks/useStorage'
import Prompt from '@sidepanel/components/Prompt'
import { CAN_COPY_ON_SELECTION } from '@sidepanel/config'
import Logger from '@sidepanel/modules/Logger'
import commandParser from '@src/libs/command-parser'
import { getCurrentTab } from '@src/libs/command-parser/handlers/tabs/tabs.helpers'
import Button from '../../components/Button'
import * as S from './Terminal.styles'

export const Terminal = () => {
  const [logs, setLogs] = useState([])
  const [tab, setTab] = useState(null)
  const inputRef = useRef(null)
  const loggerRef = useRef(null)

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
    newLog.appendsData({ tab, setTab, clearLogs })

    setLogs(oldLogs => [newLog, ...oldLogs])
    focusOnInput()
  }

  return (
    <S.TerminalWrapper onMouseUp={focusOnInput}>
      <S.TerminalHeader>
        <Button text="⚙" />
      </S.TerminalHeader>

      <Logger logs={logs} loggerRef={loggerRef} />

      <Prompt onEnter={handleEnter} inputRef={inputRef} tab={tab} />
    </S.TerminalWrapper>
  )
}
