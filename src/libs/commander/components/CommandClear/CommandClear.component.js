import { useEffect } from 'react'
import { resetConfiguration } from 'src/helpers/event.helpers.js'
import { actionTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandClear.helpers'
import { clearMessages } from './CommandClear.messages'

export const CommandClear = ({ props, terminal: { clearTerminal } }) => {
  const actionType = getActionType(props)

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.CLEAR_TERMINAL:
          clearTerminal()
          break

        case actionTypes.CLEAR_CONFIG:
          resetConfiguration()
            .catch(() => setMessageData(clearMessages.unexpectedError))
            .then(() => setMessageData(clearMessages.configurationResetSuccess))
          break

        default:
          break
      }
    },
    [actionType, clearTerminal]
  )

  return null
}
