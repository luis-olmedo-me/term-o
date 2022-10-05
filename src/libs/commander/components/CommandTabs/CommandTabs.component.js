import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType, parseHistorial } from './CommandTabs.helpers'
import { Log, useMessageLog } from '../../modules/Log'
import { tabsActionTypes } from './CommandTabs.constants'
import { fetchTabsOpen } from 'src/helpers/event.helpers.js'
import { List, Tab } from '../../modules/List'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { commanderMessages } from '../../commander.messages'
import { fetchHistorial } from '../../../../helpers/event.helpers'
import { tabsMessages } from './CommandTabs.messages'

export const CommandTabs = ({ props, terminal: { command, finish } }) => {
  const [tabs, setTabs] = useState([])

  const actionType = getActionType(props)
  const { open, protocol, byText } = props

  const { log: messageLog, setMessage } = useMessageLog()
  const { buttonGroups, pages, pageNumber } = usePaginationGroups({
    items: tabs,
    maxItems: 10
  })

  const handleShowTabList = useCallback(() => {
    fetchTabsOpen()
      .then((tabsOpen) => {
        if (!tabsOpen.length) return setMessage(tabsMessages.noTabsFound)

        setTabs(tabsOpen)
        finish()
      })
      .catch(() => setMessage(commanderMessages.unexpectedError))
  }, [finish, setMessage])

  const handleRedirect = useCallback(() => {
    if (!open) return setMessage(tabsMessages.missingURL)

    const formattedUrl = open.startsWith('www') ? open : `www.${open}`

    window.open(`${protocol}://${formattedUrl}`, '_blank')

    setMessage(tabsMessages.redirectionSuccess, {
      urlCount: open.length
    })
    finish()
  }, [open, setMessage, protocol, finish])

  const handleShowHistory = useCallback(() => {
    fetchHistorial({ text: byText })
      .then((historial) => {
        if (!historial.length) return setMessage(tabsMessages.noTabsFound)

        const parsedHistorial = parseHistorial(historial)

        setTabs(parsedHistorial)
        finish()
      })
      .catch(() => setMessage(commanderMessages.unexpectedError))
  }, [setMessage, finish, byText])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case tabsActionTypes.SHOW_CURRENT_TABS:
          handleShowTabList()
          break

        case tabsActionTypes.SHOW_HISTORY:
          handleShowHistory()
          break

        case tabsActionTypes.REDIRECT:
          handleRedirect()
          break

        case tabsActionTypes.NONE:
          setMessage(commanderMessages.unexpectedError)
          break
      }
    },
    [
      actionType,
      setMessage,
      handleShowTabList,
      handleRedirect,
      handleShowHistory
    ]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
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
      )}
    </>
  )
}
