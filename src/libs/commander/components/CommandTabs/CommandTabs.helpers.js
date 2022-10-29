import * as React from 'react'
import { formatDate } from 'src/helpers/dates.helpers'
import { ImageIcon } from 'src/modules/components/ImageIcon'
import { Copy } from 'src/modules/icons/Copy.icon'
import {
  tabsActionTypes,
  tabsHeaderIds,
  tabsTableOptions
} from './CommandTabs.constants'

export const getActionType = ({ current, past, open, delete: deleteIds }) => {
  if (deleteIds.length)
    return current ? tabsActionTypes.DELETE_OPEN_TABS : tabsActionTypes.NONE
  if (current) return tabsActionTypes.SHOW_CURRENT_TABS
  if (past) return tabsActionTypes.SHOW_HISTORY
  if (open) return tabsActionTypes.REDIRECT
  return tabsActionTypes.NONE
}

const microsecondsPerDay = 1000 * 60 * 60 * 24
export const validateHistoryFilters = ({
  byText,
  byStartDate,
  byEndDate,
  byDate,
  maxResults
}) => {
  const now = new Date().getTime()
  const yesterday = now - microsecondsPerDay

  let filters = {
    text: byText,
    maxResults,
    startTime: yesterday,
    endTime: now
  }

  if (byDate) {
    const date = new Date(byDate)
    const baseTime = date.getTime()

    const startTime = baseTime && baseTime - microsecondsPerDay
    const endTime = baseTime && baseTime

    filters = {
      ...filters,
      startTime: startTime || yesterday,
      endTime: endTime || now
    }
  }
  if (byStartDate || byEndDate) {
    const startDate = new Date(byStartDate)
    const startTime = startDate.getTime()

    const endDate = new Date(byEndDate)
    const endTime = endDate.getTime()

    filters = {
      ...filters,
      startTime: startTime || yesterday,
      endTime: endTime || now
    }
  }

  return filters
}

export const validateTabsFilters = ({ byText, here, incognito }) => {
  let filters = {}

  if (byText) {
    filters = { ...filters, text: byText.toLowerCase() }
  }
  if (here) {
    filters = { ...filters, currentWindow: true }
  }
  if (incognito) {
    filters = { ...filters, incognito: true }
  }

  return filters
}

export const turnOpenTabsToTableItems = ({ tabsOpen }) => {
  return tabsOpen.map((tab) => {
    return tabsTableOptions.columns.map(({ id }) => {
      let rowValue = tab[id]
      const valueToCopy = rowValue

      if (id === tabsHeaderIds.DATE) {
        const isRowValueString = typeof rowValue === 'string'

        rowValue = isRowValueString
          ? rowValue
          : formatDate(rowValue, 'dd/MM/yyyy hh:mm:ss')
      }
      if (id === tabsHeaderIds.HOSTNAME) {
        rowValue = new URL(tab.url).hostname
      }
      if (id === tabsHeaderIds.TITLE) {
        const hostName = new URL(tab.url).hostname

        rowValue = (
          <ImageIcon
            url={`https://www.google.com/s2/favicons?domain=${hostName}`}
            label={tab.title}
          />
        )
      }

      return {
        value: rowValue,
        actions: [
          {
            id: 'copy-value',
            title: 'Copy value',
            onClick: () => navigator.clipboard.writeText(valueToCopy),
            Component: <Copy />
          }
        ]
      }
    })
  })
}
