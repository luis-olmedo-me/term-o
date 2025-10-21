import * as React from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import CommandsViewer from '@sidepanel/components/CommandsViewer'
import Prompt from '@sidepanel/components/Prompt'
import Button, { buttonVariants } from '@src/components/Button'
import useStorage from '@src/hooks/useStorage'
import Gear from '@src/icons/Gear.icon'
import commandParser from '@src/libs/command-parser'

import { createTab, getCurrentTab } from '@src/browser-api/tabs.api'
import { commandStatuses } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { limitSimplifiedCommands, updateSimplifiedCommandsWith } from '@src/helpers/command.helpers'
import { createContext } from '@src/helpers/contexts.helpers'
import { copyText, getSelectedText } from './Terminal.helpers'
import * as S from './Terminal.styles'

export const Terminal = () => {
  const [tab, setTab] = useState(null)

  const inputRef = useRef(null)
  const currentCommandRef = useRef(null)

  const [aliases] = useStorage({ key: storageKeys.ALIASES })
  const [simplifiedCommands, setSimplifiedCommands] = useStorage({ key: storageKeys.HISTORY })
  const [config] = useStorage({ key: storageKeys.CONFIG })

  const canCopyOnSelection = config.getValueById(configInputIds.COPY_ON_SELECTION)
  const switchTabAutomatically = config.getValueById(configInputIds.SWITCH_TAB_AUTOMATICALLY)
  const maxLinesPerCommand = config.getValueById(configInputIds.MAX_LINES_PER_COMMAND)
  const rawContext = config.getValueById(configInputIds.CONTEXT)

  const focusOnPrompt = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(
    function focusTabAutomatically() {
      const updateTab = () => getCurrentTab().then(setTab)

      updateTab()

      if (!switchTabAutomatically) return
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
  }

  const handleEnter = value => {
    const newCommand = commandParser.read(value).applyData({ tab, setTab }).applyContext(context)
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
    createTab({ url: chrome.runtime.getURL('configuration.html') })
  }

  return (
    <S.TerminalWrapper onMouseUp={handleMouseUp}>
      <S.TerminalHeader>
        <Button Icon={Gear} onClick={openConfiguration} variant={buttonVariants.GHOST} />
      </S.TerminalHeader>

      <CommandsViewer commands={simplifiedCommands} />

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
