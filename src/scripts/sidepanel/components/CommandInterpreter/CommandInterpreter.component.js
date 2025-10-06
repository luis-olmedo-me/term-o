import * as React from 'preact'
import { useEffect, useRef } from 'preact/hooks'

import ColoredText from '../ColoredText'
import { Line } from '../Prompt'
import * as S from './CommandInterpreter.styles'

export const CommandInterpreter = ({ commands }) => {
  const wrapper = useRef(null)

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
    <S.CommandInterpreterWrapper ref={wrapper}>
      {commands.map(command => {
        return (
          <div key={command.id}>
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
          </div>
        )
      })}
    </S.CommandInterpreterWrapper>
  )
}

CommandInterpreter.propTypes = {
  command: Object,
  context: String,
  onFinished: Function,
  commands: Object
}
