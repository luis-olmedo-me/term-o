import * as React from 'preact'
import { useEffect, useRef } from 'preact/hooks'

import ColoredText from '@sidepanel/components/ColoredText'
import useStorage from '@src/hooks/useStorage'

import { commandStatuses } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import * as S from './CommandsViewer.styles'

export const CommandsViewer = ({ commands }) => {
  const wrapper = useRef(null)

  const [config] = useStorage({ key: storageKeys.CONFIG })
  const statusIndicator = config.getValueById(configInputIds.STATUS_INDICATOR)
  const hasStatusBar = config.getValueById(configInputIds.STATUS_BAR)
  const hasStatusLight = config.getValueById(configInputIds.STATUS_LIGHT)
  const isTruncated = config.getValueById(configInputIds.LINE_TRUNCATION)

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

  return (
    <S.ViewWrapper className="vertical-scroller">
      <div ref={wrapper}>
        {commands.map(command => {
          const hasErrorMessage = command.status === commandStatuses.ERROR
          const contextLines = command.context.split(/(?<!\\)\n/).filter(Boolean)

          return (
            <S.Command
              key={command.id}
              aria-status={command.status}
              aria-origin={hasStatusBar ? command.origin : null}
              aria-indicator={statusIndicator}
              aria-light={hasStatusLight}
              aria-truncated={isTruncated}
            >
              {contextLines.map((context, index) => (
                <S.Line key={`${context}-${index}`} aria-truncate-skip="false">
                  <ColoredText value={context} />
                </S.Line>
              ))}

              <S.Line aria-truncate-skip="false">
                <ColoredText value={command.title} />
              </S.Line>

              {command.updates.map(update => {
                return (
                  <S.Line key={update} aria-truncate-skip={hasErrorMessage}>
                    <ColoredText value={update} />
                  </S.Line>
                )
              })}

              {command.warning && (
                <S.Line key={command.warning} aria-truncate-skip="true" aria-warning="true">
                  <ColoredText value={command.warning} />
                </S.Line>
              )}
            </S.Command>
          )
        })}
      </div>
    </S.ViewWrapper>
  )
}

CommandsViewer.propTypes = {
  commands: Array
}
