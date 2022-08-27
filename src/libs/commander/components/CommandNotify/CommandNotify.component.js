import React, { useCallback, useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandNotify.helpers'
import { notifyMessages } from './CommandNotify.messages'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { notifyActionTypes } from './CommandNotify.constants'

export const CommandNotify = ({
  props,
  terminal: { command, addNotification }
}) => {
  const actionType = getActionType(props)

  const handleNotify = useCallback(() => {
    const initialId = Date.now().toString()

    addNotification(initialId, 'Test')
  }, [handleNotify])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case notifyActionTypes.NOTIFY:
          handleNotify()
          break

        default:
          break
      }
    },
    [actionType, handleNotify]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper isLoading variant={parameterTypes.TABLE} />
    </>
  )
}
