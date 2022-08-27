import React, { useCallback, useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandNotify.helpers'
import { notifyMessages } from './CommandNotify.messages'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { notifyActionTypes } from './CommandNotify.constants'

export const CommandNotify = ({
  props,
  terminal: { command, addNotification, setMessageData }
}) => {
  const { message } = props

  const actionType = getActionType(props)

  const handleNotify = useCallback(() => {
    const initialId = Date.now().toString()

    addNotification(initialId, message)

    setMessageData(notifyMessages.notificationSuccess)
  }, [handleNotify, message, setMessageData])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case notifyActionTypes.NOTIFY:
          handleNotify()
          break

        default:
          setMessageData(notifyMessages.notificationSuccess)
          break
      }
    },
    [actionType, handleNotify, setMessageData]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper isLoading variant={parameterTypes.TABLE} />
    </>
  )
}
