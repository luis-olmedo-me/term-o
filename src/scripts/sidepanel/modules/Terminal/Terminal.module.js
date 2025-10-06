import * as React from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import Button, { buttonVariants } from '@src/components/Button'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
import useConfig from '@src/hooks/useConfig'
import useStorage from '@src/hooks/useStorage'
import { Gear } from '@src/icons/Gear.component'
import commandParser from '@src/libs/command-parser'
import { getCurrentTab } from '@src/libs/command-parser/handlers/tabs/tabs.helpers'
import { statuses } from '@src/libs/command-parser/sub-services/command'
import CommandsViewer from '@src/scripts/sidepanel/modules/CommandsViewer'
import {
  copyText,
  getSelectedText,
  limitSimplifiedCommands,
  updateUpdatesHistoryWith
} from './Terminal.helpers'
import * as S from './Terminal.styles'

export const Terminal = () => {
  const [tab, setTab] = useState(null)
  const inputRef = useRef(null)

  const [aliases] = useStorage({
    namespace: storageNamespaces.LOCAL,
    key: storageKeys.ALIASES,
    defaultValue: []
  })
  const [simplifiedCommands, setSimplifiedCommands] = useStorage({
    namespace: storageNamespaces.SESSION,
    key: storageKeys.HISTORY,
    defaultValue: []
  })

  const { listening } = useConfig({
    get: [
      configInputIds.COPY_ON_SELECTION,
      configInputIds.SWITCH_TAB_AUTOMATICALLY,
      configInputIds.MAX_LINES_PER_COMMAND,
      configInputIds.CONTEXT,
      configInputIds.STATUS_INDICATOR
    ]
  })
  const [
    canCopyOnSelection,
    switchTabAutomatically,
    maxLinesPerCommand,
    rawContext,
    statusIndicator
  ] = listening

  const focusOnPrompt = useCallback(() => {
    inputRef.current?.focus()
  }, [])

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

  const copySelectedText = () => {
    const selectedText = getSelectedText()

    if (canCopyOnSelection) copyText(selectedText)
  }

  const clearLogs = () => {
    setSimplifiedCommands([])
  }

  const removePromptFocusEvent = () => {
    window.removeEventListener('keydown', focusOnPrompt)
  }

  const WaitForKeyPressToFocusOnPrompt = () => {
    removePromptFocusEvent()
    window.addEventListener('keydown', focusOnPrompt)
  }

  const handleCommandUpdate = command => {
    const commands = updateUpdatesHistoryWith(simplifiedCommands, command)
    const commandsLimited = limitSimplifiedCommands(commands, maxLinesPerCommand)

    setSimplifiedCommands(commandsLimited)
  }

  const handleCommandStatusChange = command => {
    if (!command.finished) return
    command.removeAllEventListeners()

    handleCommandUpdate(command.getCommandVisibleInChain())
  }

  const handleEnter = value => {
    const newCommand = commandParser.read(value).applyData({ tab, setTab, clearLogs })
    newCommand.setContext(context)

    if (!newCommand.failed) {
      newCommand.addEventListener('update', handleCommandUpdate)
      newCommand.addEventListener('statuschange', handleCommandStatusChange)
      newCommand.execute()
    } else {
      handleCommandStatusChange(newCommand)
    }

    focusOnPrompt()
  }

  const context = createContext(rawContext, tab)

  const handleMouseUp = () => {
    const selectedText = getSelectedText()

    if (selectedText) {
      copySelectedText()
    } else {
      removePromptFocusEvent()
      focusOnPrompt()
    }
  }

  const openConfiguration = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('configuration.html') })
  }

  return (
    <S.TerminalWrapper onMouseUp={handleMouseUp}>
      <S.TerminalHeader>
        <Button Icon={Gear} onClick={openConfiguration} variant={buttonVariants.GHOST} />
      </S.TerminalHeader>

      <CommandsViewer commands={simplifiedCommands} statusIndicator={statusIndicator} />

      <S.TerminalPrompt
        inputRef={inputRef}
        onEnter={handleEnter}
        onBlur={WaitForKeyPressToFocusOnPrompt}
        onFocus={removePromptFocusEvent}
        loading={simplifiedCommands.some(command => command.status === statuses.EXECUTING)}
        context={context}
        name="terminal-prompt"
      />
    </S.TerminalWrapper>
  )
}
