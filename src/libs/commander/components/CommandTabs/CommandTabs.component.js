import React, { useCallback, useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandTabs.helpers'
import { tabsMessages } from './CommandTabs.messages'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { tabsActionTypes } from './CommandTabs.constants'
import { getTabsInfo } from 'src/helpers/event.helpers.js'

export const CommandTabs = ({
  props,
  terminal: { command, addNotification, setMessageData }
}) => {
  const [tabs, setTabs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const actionType = getActionType(props)

  const handleShowTabList = useCallback(() => {
    const initialId = Date.now().toString()
    setIsLoading(true)

    getTabsInfo()
      .then(setTabs)
      .then(() => setIsLoading(false))

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

      <LogWrapper isLoading={isLoading} variant={parameterTypes.TABS}>
        {tabs.map((tab) => {
          return (
            <div key={tab.id}>
              <img src={tab.favIconUrl} alt='' />

              <span>{tab.title}</span>
            </div>
          )
        })}
      </LogWrapper>
    </>
  )
}
