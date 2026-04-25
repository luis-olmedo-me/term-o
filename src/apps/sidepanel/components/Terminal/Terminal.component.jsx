import { useCallback, useRef } from 'preact/hooks'

import CommandsViewer from '@sidepanel/components/CommandsViewer'
import Prompt from '@sidepanel/components/Prompt'
import Dropdown from '@src/components/Dropdown'
import useStorage from '@src/hooks/useStorage'
import Adjust from '@src/icons/Adjust.icon'

import { switchOrCreateTab } from '@src/browser-api/tabs.api'
import { origins } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createContext } from '@src/helpers/contexts.helpers'
import { threeDotsOptionIds, threeDotsOptions } from './Terminal.constants'
import {
  terminal,
  terminal__header,
  terminal__header_dropdown,
  terminal__header_dropdown_button,
  terminal__header_dropdown_options
} from './Terminal.module.scss'

export const Terminal = () => {
  const inputRef = useRef(null)

  const [tab] = useStorage({ key: storageKeys.TAB })
  const [aliases] = useStorage({ key: storageKeys.ALIASES })
  const [config] = useStorage({ key: storageKeys.CONFIG })
  const [queue] = useStorage({ key: storageKeys.COMMAND_QUEUE })
  const [addons] = useStorage({ key: storageKeys.ADDONS })

  const rawContext = config.getValueById(configInputIds.CONTEXT)

  const focusOnPrompt = useCallback(() => {
    inputRef.current?.focus()
  }, [])

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
    const selectedText = window.getSelection().toString()

    if (!selectedText) {
      removePromptFocusEvent()
      focusOnPrompt()
    }
  }

  const handleDropdownSelect = ({ value }) => {
    if (value === threeDotsOptionIds.REFRESH) chrome.runtime.reload()
    if (value === threeDotsOptionIds.CONFIG)
      switchOrCreateTab({ url: chrome.runtime.getURL('configuration.html') })
  }

  return (
    <div className={terminal} onMouseUp={handleMouseUp}>
      <header className={terminal__header}>
        <Dropdown
          Icon={Adjust}
          onSelect={handleDropdownSelect}
          className={terminal__header_dropdown}
          buttonClassName={terminal__header_dropdown_button}
          optionsClassName={terminal__header_dropdown_options}
          options={threeDotsOptions}
          name="terminal-options"
        />
      </header>

      <CommandsViewer commands={queue.value} />

      <Prompt
        inputRef={inputRef}
        onEnter={handleEnter}
        onBlur={WaitForKeyPressToFocusOnPrompt}
        onFocus={removePromptFocusEvent}
        loading={queue.isExecuting}
        context={context}
        aliases={aliases}
        addons={addons.values}
        name="terminal-prompt"
      />
    </div>
  )
}
