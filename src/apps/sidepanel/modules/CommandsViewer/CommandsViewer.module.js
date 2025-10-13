import * as React from 'preact'
import { useEffect, useRef } from 'preact/hooks'

import ColoredText from '@sidepanel/components/ColoredText'
import { Line } from '@sidepanel/components/Prompt'
import useConfig from '@src/hooks/useConfig'

import { configInputIds } from '@src/constants/config.constants'
import * as S from './CommandsViewer.styles'

export const CommandsViewer = ({ commands }) => {
  const wrapper = useRef(null)

  const config = useConfig()
  const statusIndicator = config.get(configInputIds.STATUS_INDICATOR)
  const hasStatusBar = config.get(configInputIds.STATUS_BAR)
  const hasStatusLight = config.get(configInputIds.STATUS_LIGHT)

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
          return (
            <S.Command
              key={command.id}
              aria-status={command.status}
              aria-execution-context={hasStatusBar ? command.executionContext : null}
              aria-indicator={statusIndicator}
              aria-light={hasStatusLight}
            >
              <Line>
                <ColoredText value={command.context} />
              </Line>

              <Line>
                <ColoredText value={command.title} />
              </Line>

              {command.updates.map(update => {
                return (
                  <Line key={update}>
                    <ColoredText value={update} />
                  </Line>
                )
              })}
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
