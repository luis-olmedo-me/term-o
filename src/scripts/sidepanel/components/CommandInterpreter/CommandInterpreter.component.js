import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { PROMPT_MARK } from '@src/constants/config.constants'
import ColoredText from '../ColoredText'
import { Line } from '../Prompt'

export const CommandInterpreter = ({ command, onFinished, context }) => {
  const [updates, setUpdates] = useState(command.updates)

  const wrapper = useRef(null)

  useEffect(
    function listenUpdates() {
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
    <div ref={wrapper}>
      <Line>
        <ColoredText value={context} />
      </Line>

      <Line>
        <ColoredText value={`${PROMPT_MARK} ${command.title}`} />
      </Line>

      {updates.map((update, index) => {
        return (
          <Line key={index}>
            <ColoredText value={update} />
          </Line>
        )
      })}
    </div>
  )
}

CommandInterpreter.propTypes = {
  command: Object,
  context: String,
  onFinished: Function
}
