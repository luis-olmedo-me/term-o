import * as React from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { closeTabs, fetchHistorial, fetchTabsOpen } from '@src/helpers/event.helpers'
import { updateTab } from 'helpers/event.helpers'
import {
  LogCard,
  LogContainer,
  TableLog,
  useDateRangeActions,
  useMessageLog
} from '../../modules/Log'
import {
  currentTabsTableOptions,
  MAX_ITEMS,
  pastTabsTableOptions,
  tableCellActions,
  tableComponents,
  tabsActionTypes
} from './CommandTabs.constants'
import {
  getActionType,
  turnOpenTabsToTableItems,
  validateHistoryFilters,
  validateTabsFilters
} from './CommandTabs.helpers'
import { tabsMessages } from './CommandTabs.messages'

export const CommandTabs = ({ props, terminal: { command, finish } }) => {
  const [tabs, setTabs] = useState([])

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
    const tabIdsToClose = selectedRows.map(({ id }) => id)

    await closeTabs(tabIdsToClose).catch(onError)
    await handleShowTabList().catch(onError)
  }

  const { log: messageLog, setMessage } = useMessageLog()
  const { startDateAction, endDateAction, setAreDatesInvalid, setDate } = useDateRangeActions({
    onDateUpdate: handleDatesUpdate
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

  const handleSwitch = useCallback(async () => {
    updateTab({ tabId: props.switch, props: { active: true } })
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

      case tabsActionTypes.SWITCH:
        return handleSwitch()

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
    handleGo,
    handleSwitch
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
    <LogContainer>
      {messageLog && (
        <LogCard variant={messageLog.type} command={command}>
          {messageLog.message}
        </LogCard>
      )}

      {!messageLog && (
        <TableLog
          command={command}
          maxItems={MAX_ITEMS}
          tableItems={tabs}
          options={props.now ? currentTabsTableOptions : pastTabsTableOptions}
          onSelectionDelete={handleClosingTabsFromSelection}
          hasSelection={props.now}
          leftActions={startDateAction}
          rightActions={endDateAction}
          components={tableComponents}
          actions={tableCellActions}
        />
      )}
    </LogContainer>
  )
}
