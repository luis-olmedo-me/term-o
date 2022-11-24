import * as React from 'preact'
import { useCallback, useEffect } from 'preact/hooks'

import { LogCard, LogContainer, useMessageLog } from '../../modules/Log'
import { notifyActionTypes } from './CommandNotify.constants'
import { getActionType } from './CommandNotify.helpers'
import { notifyMessages } from './CommandNotify.messages'

export const CommandNotify = ({ props, terminal: { command, addNotification, finish } }) => {
  const actionType = getActionType(props)

  const { log: messageLog, setMessage } = useMessageLog()

  const handleNotify = useCallback(() => {
    addNotification(props.message, props.image)
    setMessage(notifyMessages.notificationSuccess)
  }, [props])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case notifyActionTypes.NOTIFY:
        return handleNotify()

      case notifyActionTypes.NONE:
        throw new Error('unexpectedError')
    }
  }, [actionType, handleNotify])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(notifyMessages[error?.message] || notifyMessages.unexpectedError)
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
      <LogContainer>
        <LogCard variant={messageLog.type} command={command}>
          {messageLog.message}
        </LogCard>
      </LogContainer>
    )
  )
}
