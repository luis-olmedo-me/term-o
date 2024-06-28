import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { convertStringToObjects } from './Log.helpers'
import * as S from './Log.styles'

export const Log = ({ command, prefix, onUpdate }) => {
  const [updates, setUpdates] = useState([])
  const wrapper = useRef(null)

  useEffect(
    function listenUpdates() {
      const handleUpdate = ({ updates }) => {
        const updateBlocks = updates.map(convertStringToObjects)
        if (onUpdate) onUpdate()

        setUpdates(updateBlocks)
      }

      handleUpdate(command)
      command.addEventListener('update', handleUpdate)
      if (!command.working) command.execute()

      return () => command.removeEventListener('update', handleUpdate)
    },
    [command, onUpdate]
  )

  return (
    <S.LogWrapper ref={wrapper} hidden={command.hidden}>
      <S.LogItem>
        {prefix} {command.command}
      </S.LogItem>

      {updates.map(update => {
        return (
          <S.LogItem>
            {update.map(({ color, content }) => (
              <S.ColoredText color={color}>{content}</S.ColoredText>
            ))}
          </S.LogItem>
        )
      })}
    </S.LogWrapper>
  )
}
