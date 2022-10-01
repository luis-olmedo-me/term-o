import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandTabs.helpers'
import { Log } from '../../modules/Log'
import { tabsActionTypes } from './CommandTabs.constants'
import { getTabsInfo } from 'src/helpers/event.helpers.js'
import { List, Tab } from '../../modules/List'
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
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      <Log variant={parameterTypes.TABS} buttonGroups={buttonGroups}>
        <Carousel itemInView={pageNumber}>
          {pages.map((page, currentPageNumber) => {
            return (
              <CarouselItem key={currentPageNumber}>
                <List
                  items={page}
                  Child={({ item }) => <Tab element={item} />}
                />
              </CarouselItem>
            )
          })}
        </Carousel>
      </Log>
    </>
  )
}
