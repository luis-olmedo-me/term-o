import React, { useCallback, useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandTabs.helpers'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { tabsActionTypes } from './CommandTabs.constants'
import { getTabsInfo } from 'src/helpers/event.helpers.js'
import { ParameterElements } from '../../modules/ParameterElements/ParameterElements.component'
import { Tab } from '../../modules/ParameterElements/components/Tab/Tab.component'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { commanderMessages } from '../../commander.messages'

export const CommandTabs = ({
  props,
  terminal: { command, setMessageData, finish }
}) => {
  const [tabs, setTabs] = useState([])

  const actionType = getActionType(props)

  const { buttonGroups, pages, pageNumber } = usePaginationGroups({
    items: tabs,
    maxItems: 10
  })

  const handleShowTabList = useCallback(
    (tabsInfo) => {
      setTabs(tabsInfo)
      finish()
    },
    [finish]
  )

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case tabsActionTypes.SHOW_TAB_LIST:
          getTabsInfo()
            .then(handleShowTabList)
            .catch(() => setMessageData(commanderMessages.unexpectedError))
          break

        default:
          setMessageData(commanderMessages.unexpectedError)
          break
      }
    },
    [actionType, handleShowTabList, setMessageData]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.TABS} buttonGroups={buttonGroups}>
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
