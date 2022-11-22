import * as React from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { parameterTypes } from '../../constants/commands.constants'
import { Clock } from '../../modules/Clock/Clock.component'
import { LogCard, LogContainer, useMessageLog } from '../../modules/Log'
import { timeActionTypes } from './CommandTime.constants'
import { getActionType } from './CommandTime.helpers'
import { timeMessages } from './CommandTime.messages'

export const CommandTime = ({ props, terminal: { command, finish } }) => {
  const actionType = getActionType(props)
  const [delay, setDelay] = useState(0)

  const { log: messageLog, setMessage } = useMessageLog()

  const handleSetDelay = useCallback(() => {
    setDelay(props.delay)
    return { ignore: true }
  }, [props])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case timeActionTypes.SET_DELAY:
        return handleSetDelay()

      default:
        throw new Error('unexpectedError')
    }
  }, [actionType, handleSetDelay])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(timeMessages[error?.message] || timeMessages.unexpectedError)
        finish({ break: true })
      }

      doAction()
        .then(finish)
        .catch(handleError)
    },
    [doAction, setMessage, finish]
  )

  const handleFinishTimer = useCallback(() => {
    setMessage(timeMessages.timeSuccess)
    finish()
  }, [setMessage, finish])

  const hasDelay = Boolean(delay)

  return (
    <LogContainer>
      {messageLog && (
        <LogCard variant={messageLog.type} command={command}>
          {messageLog.message}
        </LogCard>
      )}

      {hasDelay && !messageLog && (
        <LogCard variant={parameterTypes.TABLE} command={command}>
          <Clock time={delay} onFinish={handleFinishTimer} />
        </LogCard>
      )}
    </LogContainer>
  )
}
