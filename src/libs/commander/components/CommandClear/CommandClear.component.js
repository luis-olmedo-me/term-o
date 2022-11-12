import * as React from 'preact'

import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { resetConfiguration } from 'src/helpers/event.helpers.js'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { Log, useMessageLog } from '../../modules/Log'
import { getActionType } from './CommandClear.helpers'
import { clearMessages } from './CommandClear.messages'

export const CommandClearWithoutContext = ({
  props,
  terminal: { clearTerminal, command, finish },
  setHighlitedElement
}) => {
  const actionType = getActionType(props)

  const { log: messageLog, setMessage } = useMessageLog()

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
            .catch(() => setMessage(clearMessages.unexpectedError))
            .then(() => setMessage(clearMessages.configurationResetSuccess))
            .then(() => finish())
          break

        default:
          finish()
          break
      }
    },
    [actionType, clearTerminal, setMessage, setHighlitedElement, handleClearTerminal, finish]
  )

  return (
    messageLog && (
      <>
        <Log variant={parameterTypes.COMMAND}>{command}</Log>

        <Log variant={messageLog.type}>{messageLog.message}</Log>
      </>
    )
  )
}

export const CommandClear = withOverlayContext(CommandClearWithoutContext)
