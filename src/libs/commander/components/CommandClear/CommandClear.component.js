import React, { useEffect, useState } from 'react'
import { resetConfiguration } from 'src/helpers/event.helpers.js'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandClear.helpers'
import { clearMessages } from './CommandClear.messages'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'

export const CommandClearWithoutContext = ({
  props,
  terminal: { clearTerminal, setMessageData, command },
  setHighlitedElement
}) => {
  const actionType = getActionType(props)

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.CLEAR_TERMINAL:
          clearTerminal()
          setHighlitedElement(null)
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
    [actionType, clearTerminal, setMessageData, setHighlitedElement]
  )

  return <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>
}

export const CommandClear = withOverlayContext(CommandClearWithoutContext)
