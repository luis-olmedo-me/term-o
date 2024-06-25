import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import * as S from './Log.styles'

export const Log = ({ command, prefix }) => {
  const [updates, setUpdates] = useState([])

  useEffect(
    function listenUpdates() {
      command.addEventListener('update', setUpdates)

      return () => command.removeEventListener('update', setUpdates)
    },
    [command]
  )

  return (
    !command.hidden && (
      <>
        <p>
          {prefix} {command.command}
        </p>

        {updates.map(update => {
          return <p>{update}</p>
        })}
      </>
    )
  )
}
