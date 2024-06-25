import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import * as S from './Log.styles'

export const Log = ({ command, prefix }) => {
  const [updates, setUpdates] = useState(command.updates)
  console.log('💬  Log.updates:', updates)

  useEffect(
    function listenUpdates() {
      const handleUpdate = updates => {
        console.log('💬  handleUpdate.updates:', updates)
        setUpdates(updates)
      }

      command.addEventListener('update', handleUpdate)

      return () => {
        console.log('unmount')
        command.removeEventListener('update', handleUpdate)
      }
    },
    [command]
  )

  return (
    !command.hidden && (
      <div>
        <p>
          {prefix} {command.command}
        </p>

        {updates.map(update => {
          return <p>{update}</p>
        })}
      </div>
    )
  )
}
