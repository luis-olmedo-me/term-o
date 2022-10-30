import * as React from 'react'
import { useCallback, useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { Log, useMessageLog } from '../../modules/Log'
import { timeActionTypes } from './CommandTime.constants'
import { getActionType } from './CommandTime.helpers'
import { timeMessages } from './CommandTime.messages'

export const CommandTime = ({ props, terminal: { command, finish } }) => {
  const actionType = getActionType(props)

  const { log: messageLog, setMessage } = useMessageLog()

  const handleSetDelay = useCallback(() => {
    setTimeout(() => {
      setMessage(timeMessages.notificationSuccess)
      finish()
    }, props.delay)
  }, [props, setMessage, finish])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case timeActionTypes.SET_DELAY:
          handleSetDelay()
          break
        
        default:
          setMessage(timeMessages.unexpectedError)
          break
      }
    },
    [actionType, handleSetDelay, setMessage]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}
    </>
  )
}
