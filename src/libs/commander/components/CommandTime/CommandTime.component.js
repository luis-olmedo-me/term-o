import * as React from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { parameterTypes } from '../../constants/commands.constants'
import { Clock } from '../../modules/Clock/Clock.component'
import { Log, useMessageLog } from '../../modules/Log'
import { timeActionTypes } from './CommandTime.constants'
import { getActionType } from './CommandTime.helpers'
import { timeMessages } from './CommandTime.messages'

export const CommandTime = ({ props, terminal: { command, finish } }) => {
  const actionType = getActionType(props)
  const [delay, setDelay] = useState(0)

  const { log: messageLog, setMessage } = useMessageLog()

  const handleSetDelay = useCallback(() => {
    setDelay(props.delay)
  }, [props])

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

  const handleFinishTimer = useCallback(() => {
    setMessage(timeMessages.timeSuccess)
    finish()
  }, [setMessage, finish])

  const hasDelay = Boolean(delay)

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {hasDelay && !messageLog && (
        <Log variant={parameterTypes.TABLE}>
          <Clock time={delay} onFinish={handleFinishTimer} />
        </Log>
      )}
    </>
  )
}
