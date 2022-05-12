import React, { useEffect } from 'react'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { getActionType } from './CommandStorage.helpers'
import { storageMessages } from './CommandStorage.messages'

export const CommandStorage = ({ props, terminal: { command } }) => {
  const actionType = getActionType(props)

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.LOCAL_STORAGE:
          console.log('showing LOCAL_STORAGE...', window.localStorage)
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

      <LogWrapper variant={parameterTypes.SUCCESS}>Worked!</LogWrapper>
    </>
  )
}
