import React, { useCallback, useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandTabs.helpers'
import { tabsMessages } from './CommandTabs.messages'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { tabsActionTypes } from './CommandTabs.constants'
import { getTabsInfo } from 'src/helpers/event.helpers.js'
import { ParameterElements } from '../ParameterElements/ParameterElements.component'
import { Tab } from '../ParameterElements/components/Tab/Tab.component'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'

export const CommandTabs = ({
  props,
  terminal: { command, addNotification, setMessageData }
}) => {
  const [tabs, setTabs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const actionType = getActionType(props)

  const { buttonGroups, pages, pageNumber } = usePaginationGroups({
    items: tabs,
    maxItems: 10
  })

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

      <LogWrapper
        isLoading={isLoading}
        variant={parameterTypes.TABS}
        buttonGroups={buttonGroups}
      >
        <Carousel itemInView={pageNumber}>
          {pages.map((page, currentPageNumber) => {
            return (
              <CarouselItem key={currentPageNumber}>
                <ParameterElements
                  elements={page}
                  pinnedElements={[]}
                  Child={Tab}
                />
              </CarouselItem>
            )
          })}
        </Carousel>
      </LogWrapper>
    </>
  )
}
