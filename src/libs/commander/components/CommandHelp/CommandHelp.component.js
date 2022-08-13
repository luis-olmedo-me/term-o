import { useEffect } from 'react'
import { helpActionTypes } from './CommandHelp.constants'
import { getActionType } from './CommandHelp.helpers'

export const CommandHelp = ({ props }) => {
  const actionType = getActionType(props)

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case helpActionTypes.HELP:
          console.log('helping')
          break

        case helpActionTypes.NONE:
          console.log('default')
          break
      }
    },
    [actionType]
  )

  return null
}
