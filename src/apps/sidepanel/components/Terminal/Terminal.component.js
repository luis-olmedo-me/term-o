import * as React from 'preact'
import { useCallback, useEffect, useRef } from 'preact/hooks'

import CommandsViewer from '@sidepanel/components/CommandsViewer'
import Prompt from '@sidepanel/components/Prompt'
import Button, { buttonVariants } from '@src/components/Button'
import useStorage from '@src/hooks/useStorage'
import Gear from '@src/icons/Gear.icon'
import commandParser from '@src/libs/command-parser'

import { createTab, getCurrentTab } from '@src/browser-api/tabs.api'
import { origins } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
import { copyText, getSelectedText } from './Terminal.helpers'
import * as S from './Terminal.styles'

export const Terminal = () => {
  const inputRef = useRef(null)

  const [tab, setTab] = useStorage({ key: storageKeys.TAB })
  const [aliases] = useStorage({ key: storageKeys.ALIASES })
  const [config] = useStorage({ key: storageKeys.CONFIG })
  const [queue] = useStorage({ key: storageKeys.COMMAND_QUEUE })

  const canCopyOnSelection = config.getValueById(configInputIds.COPY_ON_SELECTION)
  const switchTabAutomatically = config.getValueById(configInputIds.SWITCH_TAB_AUTOMATICALLY)
  const rawContext = config.getValueById(configInputIds.CONTEXT)

  const focusOnPrompt = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(
    function focusTabAutomatically() {
      const updateTab = () => getCurrentTab().then(tab => setTab(tab))

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

  const handleEnter = value => {
    queue.add(value, origins.MANUAL)

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

      <CommandsViewer commands={queue.value} />

      <Prompt
        inputRef={inputRef}
        onEnter={handleEnter}
        onBlur={WaitForKeyPressToFocusOnPrompt}
        onFocus={removePromptFocusEvent}
        loading={queue.isExecuting}
        context={context}
        name="terminal-prompt"
      />
    </S.TerminalWrapper>
  )
}
