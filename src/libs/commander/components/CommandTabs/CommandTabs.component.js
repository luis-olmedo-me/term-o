import * as React from 'preact'

import { Carousel, CarouselItem } from '@modules/components/Carousel'
import { Table } from '@modules/components/Table/Table.component'
import { closeTabs, fetchHistorial, fetchTabsOpen } from '@src/helpers/event.helpers'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { parameterTypes } from '../../constants/commands.constants'
import {
  Log,
  useDateRangeActions,
  useMessageLog,
  usePaginationActions,
  useTableSelection
} from '../../modules/Log'
import { MAX_ITEMS, tabsActionTypes, tabsTableOptions } from './CommandTabs.constants'
import {
  getActionType,
  turnOpenTabsToTableItems,
  validateHistoryFilters,
  validateTabsFilters
} from './CommandTabs.helpers'
import { tabsMessages } from './CommandTabs.messages'

export const CommandTabs = ({ props, terminal: { command, finish } }) => {
  const [tabs, setTabs] = useState([])
  const logRef = useRef(null)

  const actionType = getActionType(props)

  const onError = error => setMessage(tabsMessages[error?.message] || tabsMessages.unexpectedError)
  const handleDatesUpdate = async overWrittenOptions => {
    const options = {
      ...validateHistoryFilters(props),
      ...overWrittenOptions
    }
    const { startTime, endTime } = options

    const historial = await fetchHistorial(options).catch(onError)

    if (startTime) setDate({ start: startTime })
    if (endTime) setDate({ end: endTime })

    if (!historial.length) return setAreDatesInvalid(true)
    setAreDatesInvalid(false)

    const tabItems = turnOpenTabsToTableItems({ tabsOpen: historial })

    setTabs(tabItems)
  }

  const handleClosingTabsFromSelection = async ({ selectedRows }) => {
    const tabIdsToClose = selectedRows.map(([idRow]) => idRow.value)

    await closeTabs(tabIdsToClose).catch(onError)
    await handleShowTabList().catch(onError)

    clearSelection()
  }

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber, changePage } = usePaginationActions({
    items: tabs,
    maxItems: MAX_ITEMS
  })
  const { startDateAction, endDateAction, setAreDatesInvalid, setDate } = useDateRangeActions({
    onDateUpdate: handleDatesUpdate
  })
  const { clearSelection, tableSelectionProps, selectionActions } = useTableSelection({
    changePage,
    onDelete: handleClosingTabsFromSelection,
    currentRows: pages[pageNumber],
    isEnabled: props.now,
    tableItems,
    pages,
    maxItems: MAX_ITEMS
  })

  const handleShowTabList = useCallback(async () => {
    const options = validateTabsFilters(props)
    const tabsOpen = await fetchTabsOpen(options)
    const tabItems = turnOpenTabsToTableItems({ tabsOpen })

    if (!tabsOpen.length) throw new Error('noTabsFound')

    setTabs(tabItems)
  }, [props])

  const handleRedirect = useCallback(() => {
    const target = props.useCurrent ? '_self' : '_blank'

    if (!props.open) throw new Error('missingURL')

    window.open(props.open, target)
    setMessage(tabsMessages.redirectionSuccess)
  }, [props])

  const handleShowHistory = useCallback(async () => {
    const options = validateHistoryFilters(props)
    const { startTime, endTime } = options

    const historial = await fetchHistorial(options)
    const tabItems = turnOpenTabsToTableItems({ tabsOpen: historial })

    if (startTime) setDate({ start: startTime })
    if (endTime) setDate({ end: endTime })

    if (!historial.length) throw new Error('noTabsFound')

    setTabs(tabItems)
  }, [props])

  const handleCloseTabs = useCallback(async () => {
    await closeTabs(props.close)
    setMessage(tabsMessages.closeSuccess)
  }, [props, setMessage])

  const handleReloadTab = useCallback(() => {
    window.location.reload()
    setMessage(tabsMessages.reloadSuccess)
  }, [setMessage])

  const handleGo = useCallback(() => {
    window.history.go(props.go)
    setMessage(tabsMessages.goSuccess)
  }, [props, setMessage])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case tabsActionTypes.SHOW_CURRENT_TABS:
        return await handleShowTabList()

      case tabsActionTypes.SHOW_HISTORY:
        return await handleShowHistory()

      case tabsActionTypes.CLOSE_OPEN_TABS:
        return await handleCloseTabs()

      case tabsActionTypes.REDIRECT:
        return handleRedirect()

      case tabsActionTypes.RELOAD_TAB:
        return handleReloadTab()

      case tabsActionTypes.GO:
        return handleGo()

      case tabsActionTypes.NONE:
        throw new Error('unexpectedError')
    }
  }, [
    actionType,
    handleShowTabList,
    handleRedirect,
    handleShowHistory,
    handleCloseTabs,
    handleReloadTab,
    handleGo
  ])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(tabsMessages[error?.message] || tabsMessages.unexpectedError)
        finish({ break: true })
      }

      doAction()
        .then(finish)
        .catch(handleError)
    },
    [doAction, setMessage, finish]
  )

  return (
    <>
      <Log ref={logRef} variant={parameterTypes.COMMAND}>
        {command}
      </Log>

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
                    widthRef={logRef}
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
