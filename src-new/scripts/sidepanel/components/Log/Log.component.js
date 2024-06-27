import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { convertStringToObjects } from './Log.helpers'
import * as S from './Log.styles'

export const Log = ({ command, prefix }) => {
  const [updates, setUpdates] = useState([])

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
    !command.hidden && (
      <div>
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
      </div>
    )
  )
}
