import * as React from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import useConfig from '@src/hooks/useConfig'
import useStorage from '@src/hooks/useStorage'

import Button, { buttonVariants } from '@src/components/Button'
import Gear from '@src/icons/Gear.icon'
import Prompt from '../../components/Prompt'
import CommandsViewer from '../CommandsViewer'

import commandParser from '@src/libs/command-parser'

import { commandStatuses } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'

import { limitSimplifiedCommands, updateSimplifiedCommandsWith } from '@src/helpers/command.helpers'
import { createContext } from '@src/helpers/contexts.helpers'
import { getCurrentTab } from '@src/libs/command-parser/handlers/tabs/tabs.helpers'
import { copyText, getSelectedText } from './Terminal.helpers'

import * as S from './Terminal.styles'

export const Terminal = () => {
  const [tab, setTab] = useState(null)

  const inputRef = useRef(null)
  const currentCommandRef = useRef(null)

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
      configInputIds.STATUS_INDICATOR,
      configInputIds.STATUS_BAR,
      configInputIds.STATUS_LIGHT
    ]
  })
  const [
    canCopyOnSelection,
    switchTabAutomatically,
    maxLinesPerCommand,
    rawContext,
    statusIndicator,
    hasStatusBar,
    hasStatusLight
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

  const removePromptFocusEvent = () => {
    window.removeEventListener('keydown', focusOnPrompt)
  }

  const WaitForKeyPressToFocusOnPrompt = () => {
    removePromptFocusEvent()
    window.addEventListener('keydown', focusOnPrompt)
  }

  const clearCurrentCommandRef = () => {
    if (currentCommandRef.current) {
      currentCommandRef.current.removeAllEventListeners()
      currentCommandRef.current = null
    }
  }

  const clearLogs = () => {
    clearCurrentCommandRef()
    setSimplifiedCommands([])
  }

  const handleCommandUpdate = command => {
    setSimplifiedCommands(oldSimplifiedCommands => {
      const updatedCommands = updateSimplifiedCommandsWith(
        oldSimplifiedCommands,
        command.getCommandVisibleInChain(),
        command.id
      )
      const commandsLimited = limitSimplifiedCommands(updatedCommands, maxLinesPerCommand)

      return commandsLimited
    })
  }

  const handleCommandExecuted = command => {
    handleCommandUpdate(command)

    command.removeAllEventListeners()
    clearCurrentCommandRef()
  }

  const handleEnter = value => {
    const newCommand = commandParser
      .read(value)
      .applyData({ tab, setTab, clearLogs })
      .applyContext(context)
    currentCommandRef.current = newCommand

    if (!newCommand.failed) {
      newCommand.addEventListener('update', handleCommandUpdate)
      newCommand.execute().then(() => handleCommandExecuted(newCommand))
    } else {
      handleCommandExecuted(newCommand)
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

      <CommandsViewer
        commands={simplifiedCommands}
        statusIndicator={statusIndicator}
        hasStatusBar={hasStatusBar}
        hasStatusLight={hasStatusLight}
      />

      <Prompt
        inputRef={inputRef}
        onEnter={handleEnter}
        onBlur={WaitForKeyPressToFocusOnPrompt}
        onFocus={removePromptFocusEvent}
        loading={simplifiedCommands.some(command => command.status === commandStatuses.EXECUTING)}
        context={context}
        name="terminal-prompt"
      />
    </S.TerminalWrapper>
  )
}
