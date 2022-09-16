import React, { useCallback, useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandNotify.helpers'
import { notifyMessages } from './CommandNotify.messages'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { notifyActionTypes } from './CommandNotify.constants'

export const CommandNotify = ({
  props,
  terminal: { command, addNotification, setMessageData, finish }
}) => {
  const { message, image } = props

  const actionType = getActionType(props)

  const handleNotify = useCallback(() => {
    const initialId = Date.now().toString()

    addNotification(initialId, message, image)

    setMessageData(notifyMessages.notificationSuccess)
    finish()
  }, [handleNotify, message, image, setMessageData, finish])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case notifyActionTypes.NOTIFY:
          handleNotify()
          break

        default:
          setMessageData(notifyMessages.unexpectedError)
          break
      }
    },
    [actionType, handleNotify, setMessageData]
  )

  return <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>
}
