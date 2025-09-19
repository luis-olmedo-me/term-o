import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import Prompt from '@sidepanel/components/Prompt'
import Logger from '@sidepanel/modules/Logger'
import { storageKeys } from '@src/constants/storage.constants'
import useConfig, { configInputIds } from '@src/hooks/useConfig'
import useStorage, { namespaces } from '@src/hooks/useStorage'
import commandParser from '@src/libs/command-parser'
import { getCurrentTab } from '@src/libs/command-parser/handlers/tabs/tabs.helpers'
import Button from '../../components/Button'
import PreferencesModal from '../../components/PreferencesModal'
import * as S from './Terminal.styles'

export const Terminal = () => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)
  const [currentCommand, setCurrentCommand] = useState(null)
  const [commandUpdates, setCommandUpdates] = useState([])
  const [tab, setTab] = useState(null)
  const inputRef = useRef(null)

  const [aliases] = useStorage({
    namespace: namespaces.LOCAL,
    key: storageKeys.ALIASES,
    defaultValue: []
  })

  const { listening } = useConfig({
    get: [
      configInputIds.COPY_ON_SELECTION,
      configInputIds.FOCUS_PROMPT_ON_CLICK,
      configInputIds.SWITCH_TAB_AUTOMATICALLY,
      configInputIds.MAX_LINES_PER_COMMAND
    ]
  })
  const [
    canCopyOnSelection,
    focusPromptOnClick,
    switchTabAutomatically,
    maxLinesPerCommand
  ] = listening

  useEffect(
    function focusTabAutomatically() {
      if (!switchTabAutomatically) return

      const updateTab = () => getCurrentTab().then(setTab)

      updateTab()
      window.addEventListener('focus', updateTab)

      return () => window.removeEventListener('focus', updateTab)
    },
    [switchTabAutomatically]
  )

  useEffect(
    function expectAliasChanges() {
      commandParser.setAliases(aliases)
    },
    [aliases]
  )

  const focusOnInput = () => {
    if (isConfigModalOpen) return

    const selection = window.getSelection()
    const selectedText = selection.toString()

    if (canCopyOnSelection && selectedText) navigator.clipboard.writeText(selectedText)
    if (focusPromptOnClick) inputRef.current?.focus()
  }

  const clearLogs = exception => setCommandUpdates(exception ? exception.updates : [])

  const handleEnter = value => {
    const newLog = commandParser.read(value)
    newLog.appendsData({ tab, setTab, clearLogs })

    setCurrentCommand(newLog)
    focusOnInput()
  }

  const handleInProgressCommandFinished = () => {
    setCommandUpdates(updates => [...updates, currentCommand.title, ...currentCommand.updates])
    setCurrentCommand(null)
    focusOnInput()
  }

  const cutUpdates = commandUpdates.slice(maxLinesPerCommand)

  return (
    <S.TerminalWrapper onMouseUp={focusOnInput}>
      <PreferencesModal open={isConfigModalOpen} onClose={() => setIsConfigModalOpen(false)} />

      <S.TerminalHeader>
        <Button text="⚙" onClick={() => setIsConfigModalOpen(!isConfigModalOpen)} />
      </S.TerminalHeader>

      <Logger
        command={currentCommand}
        updates={cutUpdates}
        onInProgressCommandFinished={handleInProgressCommandFinished}
      />

      <Prompt
        inputRef={inputRef}
        onEnter={handleEnter}
        disabled={currentCommand !== null}
        tab={tab}
      />
    </S.TerminalWrapper>
  )
}
