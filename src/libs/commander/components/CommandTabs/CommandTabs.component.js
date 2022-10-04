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
import { fetchHistorial } from '../../../../helpers/event.helpers'
import { tabsMessages } from './CommandTabs.messages'

export const CommandTabs = ({
  props,
  terminal: { command, setMessageData, finish }
}) => {
  const [tabs, setTabs] = useState([])

  const actionType = getActionType(props)
  const { open, protocol } = props

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

  const handleRedirect = useCallback(() => {
    if (!open) return setMessageData(tabsMessages.missingURL)

    const formattedUrl = open.startsWith('www') ? open : `www.${open}`

    window.open(`${protocol}://${formattedUrl}`, '_blank')

    setMessageData(tabsMessages.redirectionSuccess, {
      urlCount: open.length
    })
    finish()
  }, [open, setMessageData, protocol, finish])

  const handleShowHistory = useCallback(
    (historial) => {
      const historialAsTableItems = historial.map(
        ({ lastVisitTime, url, title }) => {
          const hostName = new URL(url).hostname

          return {
            lastVisitTime,
            title,
            favIconUrl: `https://www.google.com/s2/favicons?domain=${hostName}`,
            hostName
          }
        }
      )

      setTabs(historialAsTableItems)
      finish()
    },
    [setMessageData, finish]
  )

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case tabsActionTypes.SHOW_CURRENT_TABS:
          getTabsInfo()
            .then(handleShowTabList)
            .catch(() => setMessageData(commanderMessages.unexpectedError))
          break

        case tabsActionTypes.SHOW_HISTORY:
          fetchHistorial()
            .then(handleShowHistory)
            .catch(() => setMessageData(commanderMessages.unexpectedError))
          break

        case tabsActionTypes.REDIRECT:
          handleRedirect()
          break

        case tabsActionTypes.NONE:
          setMessageData(commanderMessages.unexpectedError)
          break
      }
    },
    [
      actionType,
      setMessageData,
      handleShowTabList,
      handleRedirect,
      handleShowHistory
    ]
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
