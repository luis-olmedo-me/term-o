import * as React from 'preact'

import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { useCallback, useEffect } from 'preact/hooks'
import { resetConfiguration } from 'src/helpers/event.helpers.js'
import { parameterTypes } from '../../constants/commands.constants'
import { Log, useMessageLog } from '../../modules/Log'
import { clearActionTypes } from './CommandClear.constants'
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

    return { break: true }
  }, [clearTerminal, setHighlitedElement])

  const handleClearConfig = useCallback(async () => {
    await resetConfiguration()
    setMessage(clearMessages.configurationResetSuccess)
  }, [setMessage])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case clearActionTypes.CLEAR_TERMINAL:
        return handleClearTerminal()

      case clearActionTypes.CLEAR_CONFIG:
        return await handleClearConfig()
    }
  }, [actionType, handleClearTerminal, handleClearConfig])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(clearMessages[error?.message] || clearMessages.unexpectedError)
        finish({ break: true })
      }

      doAction()
        .then(finish)
        .catch(handleError)
    },
    [doAction, setMessage, finish]
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
