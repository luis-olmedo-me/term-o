import { useEffect, useCallback } from 'react'
import { actionTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandClear.helpers'

export const CommandClear = ({ props, terminal: { clearTerminal } }) => {
  const actionType = getActionType(props)

  const handleClearConfig = useCallback(() => {
    clearTerminal()
  }, [clearTerminal])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.CLEAR_TERMINAL:
          clearTerminal()
          break

        case actionTypes.CLEAR_CONFIG:
          handleClearConfig()
          break

        default:
          break
      }
    },
    [actionType, clearTerminal, handleClearConfig]
  )

  return null
}
