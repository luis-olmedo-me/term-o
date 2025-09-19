import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import ColoredText from '../ColoredText'
import Prompt from '../Prompt'
import * as S from './Log.styles'

export const Log = ({ command, onFinished, context }) => {
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
    <S.LogWrapper ref={wrapper}>
      <Prompt context={context} defaultValue={command.title} disabled />

      {updates.map((update, index) => {
        return (
          <S.LogItem key={index}>
            <ColoredText value={update} />
          </S.LogItem>
        )
      })}
    </S.LogWrapper>
  )
}

Log.propTypes = {
  command: Object,
  context: String,
  onFinished: Function
}
