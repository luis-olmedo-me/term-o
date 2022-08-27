import React, { useCallback, useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandTabs.helpers'
import { tabsMessages } from './CommandTabs.messages'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { tabsActionTypes } from './CommandTabs.constants'

export const CommandTabs = ({
  props,
  terminal: { command, addNotification, setMessageData }
}) => {
  const actionType = getActionType(props)

  const handleShowTabList = useCallback(() => {
    const initialId = Date.now().toString()

    addNotification(initialId, 'showing tabs...')
  }, [])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case tabsActionTypes.SHOW_TAB_LIST:
          handleShowTabList()
          break

        default:
          setMessageData(tabsMessages.unexpectedError)
          break
      }
    },
    [actionType, handleShowTabList, setMessageData]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper isLoading variant={parameterTypes.TABLE} />
    </>
  )
}
