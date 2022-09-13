import React, { useCallback, useEffect, useState } from 'react'
import { resetConfiguration } from 'src/helpers/event.helpers.js'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandClear.helpers'
import { clearMessages } from './CommandClear.messages'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'

export const CommandClearWithoutContext = ({
  props,
  terminal: { clearTerminal, setMessageData, command, finish },
  setHighlitedElement
}) => {
  const actionType = getActionType(props)

  const handleClearTerminal = useCallback(() => {
    clearTerminal()
    setHighlitedElement(null)
    finish()
  }, [clearTerminal, setHighlitedElement, finish])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.CLEAR_TERMINAL:
          handleClearTerminal()
          break

        case actionTypes.CLEAR_CONFIG:
          resetConfiguration()
            .catch(() => setMessageData(clearMessages.unexpectedError))
            .then(() => setMessageData(clearMessages.configurationResetSuccess))
            .then(() => finish())
          break

        default:
          finish()
          break
      }
    },
    [
      actionType,
      clearTerminal,
      setMessageData,
      setHighlitedElement,
      handleClearTerminal,
      finish
    ]
  )

  return <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>
}

export const CommandClear = withOverlayContext(CommandClearWithoutContext)
