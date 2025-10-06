import * as React from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import Button, { buttonVariants } from '@src/components/Button'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
import { debounce } from '@src/helpers/utils.helpers'
import useConfig from '@src/hooks/useConfig'
import useStorage from '@src/hooks/useStorage'
import { Gear } from '@src/icons/Gear.component'
import commandParser from '@src/libs/command-parser'
import { getCurrentTab } from '@src/libs/command-parser/handlers/tabs/tabs.helpers'
import CommandsViewer from '@src/scripts/sidepanel/modules/CommandsViewer'
import { copyText, getSelectedText, updateUpdatesHistoryWith } from './Terminal.helpers'
import * as S from './Terminal.styles'

export const Terminal = () => {
  const [currentCommand, setCurrentCommand] = useState(null)
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
      configInputIds.CONTEXT
    ]
  })
  const [canCopyOnSelection, switchTabAutomatically, maxLinesPerCommand, status] = listening

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

  const handleEnter = value => {
    const newCommand = commandParser.read(value).applyData({ tab, setTab, clearLogs })
    newCommand.setContext(context)

    const handleUpdate = debounce(command => {
      const newUpdates = updateUpdatesHistoryWith(simplifiedCommands, command)

      setSimplifiedCommands(newUpdates)
    }, 50)
    const handleChangeStatus = debounce(command => {
      if (!command.finished) return
      newCommand.removeEventListener('update', handleUpdate)
      newCommand.removeEventListener('statuschange', handleChangeStatus)

      handleUpdate(command.getCommandVisibleInChain())
      setCurrentCommand(null)
    }, 50)

    if (!newCommand.failed) {
      newCommand.addEventListener('update', handleUpdate)
      newCommand.addEventListener('statuschange', handleChangeStatus)
      newCommand.execute()

      setCurrentCommand(newCommand)
    } else {
      handleChangeStatus(newCommand)
    }

    focusOnPrompt()
  }

  const cutUpdates = simplifiedCommands.slice(maxLinesPerCommand * -1)
  const context = createContext(status, tab)

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

      <CommandsViewer command={currentCommand} updates={cutUpdates} commands={simplifiedCommands} />

      <S.TerminalPrompt
        inputRef={inputRef}
        onEnter={handleEnter}
        onBlur={WaitForKeyPressToFocusOnPrompt}
        onFocus={removePromptFocusEvent}
        loading={currentCommand !== null}
        context={context}
        name="terminal-prompt"
      />
    </S.TerminalWrapper>
  )
}
