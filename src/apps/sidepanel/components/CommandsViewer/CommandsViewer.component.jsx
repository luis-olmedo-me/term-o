import { useEffect, useRef } from 'preact/hooks'

import ColoredText from '@src/components/ColoredText'
import useStorage from '@src/hooks/useStorage'

import { commandStatuses } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { global__scrollable } from '@styles/global.module.scss'
import { getCaretOffset, getTokenAt, selectToken } from './CommandsViewer.helpers'
import {
  viewer,
  viewer__command,
  viewer__command___mod_lighted,
  viewer__command___mod_truncated,
  viewer__line,
  viewer__line___mod_truncated,
  viewer__line___variant_warning
} from './CommandsViewer.module.scss'

export const CommandsViewer = ({ commands }) => {
  const wrapper = useRef(null)

  const [config] = useStorage({ key: storageKeys.CONFIG })
  const statusIndicator = config.getValueById(configInputIds.STATUS_INDICATOR)
  const hasStatusBar = config.getValueById(configInputIds.STATUS_BAR)
  const hasStatusLight = config.getValueById(configInputIds.STATUS_LIGHT)
  const hasAssistedSelection = config.getValueById(configInputIds.ASSISTED_SELECTION)
  const isTruncated = config.getValueById(configInputIds.LINE_TRUNCATION)
  const canCopyOnSelection = config.getValueById(configInputIds.COPY_ON_SELECTION)

  useEffect(
    function listenUpdates() {
      const commandElements = wrapper.current?.children
      const lastCommandElement = commandElements.item(commandElements.length - 1)

      const timeoutId = setTimeout(
        () => lastCommandElement?.scrollIntoView({ behavior: 'smooth', block: 'end' }),
        0
      )

      return () => clearTimeout(timeoutId)
    },
    [commands]
  )

  const handleLineMouseUp = event => {
    let line = event.target
    const selection = window.getSelection().toString()

    if (!hasAssistedSelection || selection || line.tagName === 'P') {
      if (canCopyOnSelection && selection) navigator.clipboard.writeText(selection)

      return
    }

    while (line && line.tagName !== 'P') {
      line = line.parentElement
    }

    const text = line.textContent
    const offset = getCaretOffset(line, event)

    const result = getTokenAt(text, offset)

    if (result) {
      selectToken(line, result.start, result.end)

      if (canCopyOnSelection) navigator.clipboard.writeText(result.token)
    }
  }

  return (
    <div className={`${global__scrollable} ${viewer}`}>
      <section ref={wrapper}>
        {commands.map((command, commandIndex) => {
          const hasErrorMessage = command.status === commandStatuses.ERROR

          return (
            <article
              key={command.id}
              data-status={command.status}
              data-origin={hasStatusBar ? command.origin : null}
              data-indicator={statusIndicator}
              className={`
                ${viewer__command}
                ${isTruncated ? viewer__command___mod_truncated : ''}
                ${hasStatusLight ? viewer__command___mod_lighted : ''}
              `}
            >
              <p onMouseUp={handleLineMouseUp} className={viewer__line}>
                <ColoredText value={command.context} />
              </p>

              <p
                onMouseUp={handleLineMouseUp}
                className={`
                  ${viewer__line}
                  ${isTruncated ? viewer__line___mod_truncated : ''}
                `}
              >
                {command.title}
              </p>

              {command.updates.map((update, index) => {
                const isLastItem = index === command.updates.length - 1
                const isTruncatedMessage = isTruncated && !isLastItem && !hasErrorMessage

                return (
                  <p
                    key={`${commandIndex}-${index}`}
                    onMouseUp={handleLineMouseUp}
                    className={`
                      ${viewer__line}
                      ${isTruncatedMessage ? viewer__line___mod_truncated : ''}
                    `}
                  >
                    <ColoredText value={update} />
                  </p>
                )
              })}

              {command.warning && (
                <p
                  className={`${viewer__line} ${viewer__line___variant_warning}`}
                  key={command.warning}
                  onMouseUp={handleLineMouseUp}
                >
                  <ColoredText value={command.warning} />
                </p>
              )}
            </article>
          )
        })}
      </section>
    </div>
  )
}

CommandsViewer.propTypes = {
  commands: Array
}
