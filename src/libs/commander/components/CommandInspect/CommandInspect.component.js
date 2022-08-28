import React, { useCallback, useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandInspect.helpers'
import { inspectMessages } from './CommandInspect.messages'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { inspectActionTypes } from './CommandInspect.constants'

export const CommandInspect = ({
  props,
  terminal: { command, setMessageData }
}) => {
  const actionType = getActionType(props)

  const handleInspect = useCallback(() => {
    setMessageData(inspectMessages.notificationSuccess)
  }, [handleInspect, setMessageData])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case inspectActionTypes.INSPECT:
          handleInspect()
          break

        default:
          setMessageData(inspectMessages.unexpectedError)
          break
      }
    },
    [actionType, handleInspect, setMessageData]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper isLoading variant={parameterTypes.TABLE} />
    </>
  )
}
