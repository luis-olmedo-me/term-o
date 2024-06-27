import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { convertStringToObjects } from './Log.helpers'
import * as S from './Log.styles'

export const Log = ({ command, prefix }) => {
  const [updates, setUpdates] = useState([])
  const wrapper = useRef(null)

  useEffect(
    function listenUpdates() {
      const handleUpdate = ({ updates }) => {
        const updateBlocks = updates.map(convertStringToObjects)

        setUpdates(updateBlocks)
      }

      handleUpdate(command)
      command.addEventListener('update', handleUpdate).execute()

      return () => command.removeEventListener('update', handleUpdate)
    },
    [command]
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
              <span style={{ color }}>{content}</span>
            ))}
          </S.LogItem>
        )
      })}
    </S.LogWrapper>
  )
}
