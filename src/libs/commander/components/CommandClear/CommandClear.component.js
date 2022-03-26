import { useEffect } from 'react'
import { actionTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandClear.helpers'

export const CommandClear = ({ terminal: { clearTerminal } }) => {
  const actionType = getActionType()

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.CLEAR_TERMINAL:
          clearTerminal()
          break

        default:
          break
      }
    },
    [actionType, clearTerminal]
  )

  return null
}
