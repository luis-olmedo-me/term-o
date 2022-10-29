import * as React from 'react'
import { useCallback, useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { Log, useMessageLog } from '../../modules/Log'
import { timeActionTypes } from './CommandTime.constants'
import { getActionType } from './CommandTime.helpers'
import { timeMessages } from './CommandTime.messages'

export const CommandTime = ({
  props,
  terminal: { command, addNotification, finish }
}) => {
  const actionType = getActionType(props)

  const { log: messageLog, setMessage } = useMessageLog()

  const handleNotify = useCallback(() => {
    setMessage(timeMessages.notificationSuccess)
    finish()
  }, [setMessage, finish])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        default:
          setMessage(timeMessages.unexpectedError)
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
