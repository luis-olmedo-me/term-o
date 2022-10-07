import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import {
  getActionType,
  parseHistorial,
  validateHistoryFilters,
  validateTabsFilters
} from './CommandTabs.helpers'
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
  const [dates, setDates] = useState({ start: null, end: null })

  const actionType = getActionType(props)
  const { open } = props

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationGroups({
    items: tabs,
    maxItems: 10
  })

  const handleShowTabList = useCallback(() => {
    const options = validateTabsFilters(props)

    fetchTabsOpen(options)
      .then((tabsOpen) => {
        if (!tabsOpen.length) return setMessage(tabsMessages.noTabsFound)

        setTabs(tabsOpen)
        finish()
      })
      .catch(() => setMessage(commanderMessages.unexpectedError))
  }, [finish, setMessage, props])

  const handleRedirect = useCallback(() => {
    if (!open) return setMessage(tabsMessages.missingURL)

    window.open(open, '_blank')

    setMessage(tabsMessages.redirectionSuccess)
    finish()
  }, [open, setMessage, finish])

  const handleShowHistory = useCallback(() => {
    const options = validateHistoryFilters(props)
    const { startTime, endTime } = options

    if (startTime) setDates((dates) => ({ ...dates, start: startTime }))
    if (endTime) setDates((dates) => ({ ...dates, end: endTime }))

    fetchHistorial(options)
      .then((historial) => {
        if (!historial.length) return setMessage(tabsMessages.noTabsFound)

        const parsedHistorial = parseHistorial(historial)

        setTabs(parsedHistorial)
        finish()
      })
      .catch(() => setMessage(commanderMessages.unexpectedError))
  }, [setMessage, finish, props])

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

  const startDateAction = dates.start
    ? [
        {
          id: 'date-start-picker',
          text: new Date(dates.start),
          label: new Date(dates.start).toLocaleString(),
          onChange: (event) => console.log(event.target.value),
          type: 'datetime'
        }
      ]
    : []

  const endDateAction = dates.end
    ? [
        {
          id: 'date-end-picker',
          text: new Date(dates.end),
          label: new Date(dates.end).toLocaleString(),
          onChange: (event) => console.log(event.target.value),
          type: 'datetime'
        }
      ]
    : []

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
        <Log
          variant={parameterTypes.TABS}
          actionGroups={[
            ...startDateAction,
            ...paginationActions,
            ...endDateAction
          ]}
        >
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
