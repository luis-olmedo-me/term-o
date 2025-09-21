import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import Prompt from '@sidepanel/components/Prompt'
import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
import useConfig, { configInputIds } from '@src/hooks/useConfig'
import useStorage, { namespaces } from '@src/hooks/useStorage'
import commandParser from '@src/libs/command-parser'
import { getCurrentTab } from '@src/libs/command-parser/handlers/tabs/tabs.helpers'
import CommandsViewer from '@src/scripts/sidepanel/modules/CommandsViewer'
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
      configInputIds.MAX_LINES_PER_COMMAND,
      configInputIds.STATUS
    ]
  })
  const [
    canCopyOnSelection,
    focusPromptOnClick,
    switchTabAutomatically,
    maxLinesPerCommand,
    status
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

  const clearLogsAt = command => exception => {
    setCommandUpdates(exception ? exception.updates : [])
    command.kill()
  }

  const handleEnter = value => {
    const newCommand = commandParser.read(value)
    newCommand.appendsData({ tab, setTab, clearLogs: clearLogsAt(newCommand) })

    setCurrentCommand(newCommand)
    focusOnInput()
  }

  const handleInProgressCommandFinished = async () => {
    const currentCommandUpdates = currentCommand.alive
      ? [context, currentCommand.title, ...currentCommand.updates]
      : []

    setCommandUpdates(updates => [...updates, ...currentCommandUpdates])
    setCurrentCommand(null)
    focusOnInput()
  }

  const cutUpdates = commandUpdates.slice(maxLinesPerCommand * -1)
  const context = createContext(status, tab)

  return (
    <S.TerminalWrapper onMouseUp={focusOnInput}>
      <PreferencesModal open={isConfigModalOpen} onClose={() => setIsConfigModalOpen(false)} />

      <S.TerminalHeader>
        <Button text="⚙" onClick={() => setIsConfigModalOpen(!isConfigModalOpen)} />
      </S.TerminalHeader>

      <CommandsViewer
        command={currentCommand}
        updates={cutUpdates}
        context={context}
        onInProgressCommandFinished={handleInProgressCommandFinished}
      />

      <Prompt
        inputRef={inputRef}
        onEnter={handleEnter}
        loading={currentCommand !== null}
        context={context}
      />
    </S.TerminalWrapper>
  )
}
