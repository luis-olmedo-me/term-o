import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import {
  getActionType,
  parseHistorial,
  validateHistoryFilters,
  validateTabsFilters
} from './CommandTabs.helpers'
import {
  Log,
  useDateRangeActions,
  useMessageLog,
  usePaginationActions
} from '../../modules/Log'
import { tabsActionTypes } from './CommandTabs.constants'
import { fetchTabsOpen } from 'src/helpers/event.helpers.js'
import { List, Tab } from '../../modules/List'
import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { commanderMessages } from '../../commander.messages'
import { fetchHistorial } from '../../../../helpers/event.helpers'
import { tabsMessages } from './CommandTabs.messages'

export const CommandTabs = ({ props, terminal: { command, finish } }) => {
  const [tabs, setTabs] = useState([])

  const actionType = getActionType(props)
  const { open } = props

  const handleDatesUpdate = (overWrittenOptions) => {
    const options = {
      ...validateHistoryFilters(props),
      ...overWrittenOptions
    }
    const { startTime, endTime } = options

    fetchHistorial(options)
      .then((historial) => {
        if (startTime) setDate({ start: startTime })
        if (endTime) setDate({ end: endTime })

        if (!historial.length) return setAreDatesInvalid(true)
        setAreDatesInvalid(false)

        const parsedHistorial = parseHistorial(historial)

        setTabs(parsedHistorial)
      })
      .catch(() => setMessage(commanderMessages.unexpectedError))
  }

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: tabs,
    maxItems: 10
  })
  const { startDateAction, endDateAction, setAreDatesInvalid, setDate } =
    useDateRangeActions({ onDateUpdate: handleDatesUpdate })

  const handleShowTabList = useCallback(() => {
    const options = validateTabsFilters(props)

    fetchTabsOpen(options)
      .then((tabsOpen) => {
        if (!tabsOpen.length) return setMessage(tabsMessages.noTabsFound)

        setTabs(tabsOpen.map((tab) => ({ ...tab, date: 'Now' })))
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

    if (startTime) setDate({ start: startTime })
    if (endTime) setDate({ end: endTime })

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
