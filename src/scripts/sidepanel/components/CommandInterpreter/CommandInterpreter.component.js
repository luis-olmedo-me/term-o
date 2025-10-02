import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import ColoredText from '../ColoredText'
import Prompt from '../Prompt'
import * as S from './CommandInterpreter.styles'

export const CommandInterpreter = ({ command, onFinished, context }) => {
  const [updates, setUpdates] = useState(command.updates)

  const wrapper = useRef(null)

  useEffect(
    async function listenUpdates() {
      wrapper.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })

      const handleUpdate = ({ updates: newUpdates }) => {
        const limitedUpdates = newUpdates

        setUpdates(limitedUpdates)
      }

      const handleChangeStatus = () => {
        if (command.finished) onFinished()
      }

      handleUpdate(command)

      if (command.failed) return onFinished()

      command.addEventListener('update', handleUpdate)
      command.addEventListener('statuschange', handleChangeStatus)

      if (!command.finished) command.execute()

      return () => {
        command.removeEventListener('update', handleUpdate)
        command.removeEventListener('statuschange', handleUpdate)
      }
    },
    [command]
  )

  return (
    <S.CommandInterpreterWrapper ref={wrapper}>
      <Prompt name="current-command" context={context} defaultValue={command.title} disabled />

      {updates.map((update, index) => {
        return (
          <S.CommandInterpreterItem key={index}>
            <ColoredText value={update} />
          </S.CommandInterpreterItem>
        )
      })}
    </S.CommandInterpreterWrapper>
  )
}

CommandInterpreter.propTypes = {
  command: Object,
  context: String,
  onFinished: Function
}
