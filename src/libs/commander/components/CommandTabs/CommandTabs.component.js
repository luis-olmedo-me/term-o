import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { Table } from 'modules/components/Table/Table.component'
import * as React from 'react'
import {
  closeTabs,
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
import { useTableSelection } from '../../modules/Log/hooks/useTableSelection'
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

  const handleClosingTabsFromSelection = async ({ selectedRows }) => {
    const tabIdsToClose = selectedRows.map(([idRow]) => idRow.value)

    await closeTabs(tabIdsToClose)

    handleShowTabList()

    clearSelection()
  }

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: tabs,
    maxItems: 10
  })
  const { startDateAction, endDateAction, setAreDatesInvalid, setDate } =
    useDateRangeActions({ onDateUpdate: handleDatesUpdate })
  const { clearSelection, tableSelectionProps, selectionActions } =
    useTableSelection({
      handleSkullClick: handleClosingTabsFromSelection,
      currentRows: pages[pageNumber],
      isEnabled: props.now
    })

  const handleShowTabList = React.useCallback(() => {
    const options = validateTabsFilters(props)

    fetchTabsOpen(options)
      .then((tabsOpen) => {
        if (!tabsOpen.length) return setMessage(tabsMessages.noTabsFound)

        const tabItems = turnOpenTabsToTableItems({ tabsOpen })

        setTabs(tabItems)
        finish()
      })
      .catch(() => setMessage(commanderMessages.unexpectedError))
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

  const handleCloseTabs = React.useCallback(() => {
    closeTabs(props.close)

    setMessage(tabsMessages.closeSuccess)
    finish()
  }, [props, setMessage, finish])

  const handleReloadTab = React.useCallback(() => {
    window.location.reload()

    setMessage(tabsMessages.reloadSuccess)
    finish()
  }, [setMessage, finish])

  const handleGo = React.useCallback(() => {
    window.history.go(props.go)

    setMessage(tabsMessages.goSuccess)
    finish()
  }, [props, setMessage, finish])

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

        case tabsActionTypes.CLOSE_OPEN_TABS:
          handleCloseTabs()
          break

        case tabsActionTypes.RELOAD_TAB:
          handleReloadTab()
          break

        case tabsActionTypes.GO:
          handleGo()
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
      handleCloseTabs,
      handleReloadTab,
      handleGo
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
            ...endDateAction,
            ...selectionActions
          ]}
        >
          <Carousel itemInView={pageNumber}>
            {pages.map((page, currentPageNumber) => {
              return (
                <CarouselItem key={currentPageNumber}>
                  <Table
                    {...tableSelectionProps}
                    rows={page}
                    options={tabsTableOptions}
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
