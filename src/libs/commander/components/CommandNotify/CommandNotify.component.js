import React, { useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandNotify.helpers'
import { notifyMessages } from './CommandNotify.messages'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { notifyActionTypes } from './CommandNotify.constants'
import { Notification } from '../Notification/Notification.component'

export const CommandNotify = ({ props, terminal: { command } }) => {
  const actionType = getActionType(props)

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case notifyActionTypes.NOTIFY:
          console.log('hola!')
          break

        default:
          break
      }
    },
    [actionType]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper isLoading variant={parameterTypes.TABLE} />

      <Notification />
    </>
  )
}
