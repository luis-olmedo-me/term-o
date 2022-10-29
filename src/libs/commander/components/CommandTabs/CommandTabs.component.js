import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { Table } from 'modules/components/Table/Table.component'
import * as React from 'react'
import {
  deleteTabs,
  fetchHistorial,
  fetchTabsOpen
} from 'src/helpers/event.helpers'
import { commanderMessages } from '../../commander.messages'
import { parameterTypes } from '../../constants/commands.constants'
import {
  Log,
  useDateRangeActions,
  useMessageLog,
  usePaginationActions
} from '../../modules/Log'
import { tabsActionTypes, tabsTableOptions } from './CommandTabs.constants'
import {
  getActionType,
  turnOpenTabsToTableItems,
  validateHistoryFilters,
  validateTabsFilters
} from './CommandTabs.helpers'
import { tabsMessages } from './CommandTabs.messages'

export const CommandTabs = ({ props, terminal: { command, finish } }) => {
  const [tabs, setTabs] = React.useState([])

  const actionType = getActionType(props)

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

        const tabItems = turnOpenTabsToTableItems({ tabsOpen: historial })

        setTabs(tabItems)
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

  const handleShowTabList = React.useCallback(() => {
    const options = validateTabsFilters(props)

    fetchTabsOpen(options)
      .then((tabsOpen) => {
        if (!tabsOpen.length) return setMessage(tabsMessages.noTabsFound)

        const tabItems = turnOpenTabsToTableItems({ tabsOpen })

        setTabs(tabItems)
        finish()
      })
      .catch(
        (error) =>
          console.log(error) || setMessage(commanderMessages.unexpectedError)
      )
  }, [finish, setMessage, props])

  const handleRedirect = React.useCallback(() => {
    if (!props.open) return setMessage(tabsMessages.missingURL)

    const target = props.useCurrent ? '_self' : '_blank'

    window.open(props.open, target)

    setMessage(tabsMessages.redirectionSuccess)
    finish()
  }, [props, setMessage, finish])

  const handleShowHistory = React.useCallback(() => {
    const options = validateHistoryFilters(props)
    const { startTime, endTime } = options

    if (startTime) setDate({ start: startTime })
    if (endTime) setDate({ end: endTime })

    fetchHistorial(options)
      .then((historial) => {
        if (!historial.length) return setMessage(tabsMessages.noTabsFound)

        const tabItems = turnOpenTabsToTableItems({ tabsOpen: historial })

        setTabs(tabItems)
        finish()
      })
      .catch(() => setMessage(commanderMessages.unexpectedError))
  }, [setMessage, finish, props])

  const handleDeleteTabs = React.useCallback(() => {
    const numericTabIds = props.delete.map(Number)
    const hasInvalidTabIds = numericTabIds.some(Number.isNaN)

    if (hasInvalidTabIds) return setMessage(tabsMessages.tabIdsInvalid)

    deleteTabs(numericTabIds)

    setMessage(tabsMessages.killSuccess)
    finish()
  }, [props, setMessage, finish])

  const handleReloadTab = React.useCallback(() => {
    window.location.reload()
  }, [])

  React.useEffect(
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

        case tabsActionTypes.DELETE_OPEN_TABS:
          handleDeleteTabs()
          break

        case tabsActionTypes.RELOAD_TAB:
          handleReloadTab()
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
      handleShowHistory,
      handleDeleteTabs,
      handleReloadTab
    ]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
        <Log
          variant={parameterTypes.TABLE}
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
                  <Table rows={page} options={tabsTableOptions} />
                </CarouselItem>
              )
            })}
          </Carousel>
        </Log>
      )}
    </>
  )
}
