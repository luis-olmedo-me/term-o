import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import ColoredText from '../ColoredText'
import * as S from './Log.styles'

export const Log = ({ command, prefix, onUpdate }) => {
  const [updates, setUpdates] = useState(command.updates)
  const wrapper = useRef(null)

  useEffect(
    function listenUpdates() {
      const handleUpdate = ({ updates: newUpdates }) => {
        if (onUpdate) onUpdate()

        setUpdates(newUpdates)
      }

      handleUpdate(command)
      command.addEventListener('update', handleUpdate)
      if (!command.finished) command.execute()

      return () => command.removeEventListener('update', handleUpdate)
    },
    [command, onUpdate]
  )

  return (
    <S.LogWrapper ref={wrapper} hidden={command.hidden}>
      <S.LogItem>
        {prefix} {command.title}
      </S.LogItem>

      {updates.map(update => {
        return (
          <S.LogItem>
            <ColoredText value={update} />
          </S.LogItem>
        )
      })}
    </S.LogWrapper>
  )
}
