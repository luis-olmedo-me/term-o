import * as React from 'preact'
import { useEffect, useRef } from 'preact/hooks'

import ColoredText from '../ColoredText'
import { Line } from '../Prompt'
import * as S from './CommandInterpreter.styles'

export const CommandInterpreter = ({ command, commands }) => {
  const wrapper = useRef(null)

  useEffect(
    function listenUpdates() {
      wrapper.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    },
    [command]
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
