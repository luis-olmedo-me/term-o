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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.CLEAR_TERMINAL:
          clearTerminal()
          setHighlitedElement(null)
          setIsLoading(false)
          break

        case actionTypes.CLEAR_CONFIG:
          resetConfiguration()
            .catch(() => setMessageData(clearMessages.unexpectedError))
            .then(() => setMessageData(clearMessages.configurationResetSuccess))
            .finally(() => setIsLoading(false))
          break

        default:
          break
      }
    },
    [actionType, clearTerminal, setMessageData, setHighlitedElement]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper isLoading={isLoading} variant={parameterTypes.INFO} />
    </>
  )
}

export const CommandClear = withOverlayContext(CommandClearWithoutContext)
