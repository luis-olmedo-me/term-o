import * as React from 'react'
import { useCallback, useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandNotify.helpers'
import { notifyMessages } from './CommandNotify.messages'
import { Log, useMessageLog } from '../../modules/Log'
import { notifyActionTypes } from './CommandNotify.constants'

export const CommandNotify = ({
  props,
  terminal: { command, addNotification, finish }
}) => {
  const { message, image } = props

  const actionType = getActionType(props)

  const { log: messageLog, setMessage } = useMessageLog()

  const handleNotify = useCallback(() => {
    const initialId = Date.now().toString()

    addNotification(initialId, message, image)

    setMessage(notifyMessages.notificationSuccess)
    finish()
  }, [handleNotify, message, image, setMessage, finish])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case notifyActionTypes.NOTIFY:
          handleNotify()
          break

        default:
          setMessage(notifyMessages.unexpectedError)
          break
      }
    },
    [actionType, handleNotify, setMessage]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}
    </>
  )
}
