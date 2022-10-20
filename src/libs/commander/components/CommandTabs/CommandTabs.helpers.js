import { formatDate } from 'src/helpers/dates.helpers'
import {
  tabsActionTypes,
  tabsHeaderIds,
  tabsTableOptions
} from './CommandTabs.constants'

export const getActionType = ({ current, past, open, kill }) => {
  if (kill.length) return tabsActionTypes.DELETE_OPEN_TABS
  if (current) return tabsActionTypes.SHOW_CURRENT_TABS
  if (past) return tabsActionTypes.SHOW_HISTORY
  if (open) return tabsActionTypes.REDIRECT
  else return tabsActionTypes.NONE
}

export const parseHistorial = (historial) => {
  return historial.map(({ lastVisitTime, url, title }) => {
    const hostName = new URL(url).hostname

    return {
      date: formatDate(lastVisitTime, 'dd/MM/yyyy hh:mm:ss'),
      title,
      favIconUrl: `https://www.google.com/s2/favicons?domain=${hostName}`,
      hostName
    }
  })
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

      if (id === tabsHeaderIds.DATE) {
        const isRowValueString = typeof rowValue === 'string'

        rowValue = isRowValueString
          ? rowValue
          : formatDate(rowValue, 'dd/MM/yyyy hh:mm:ss')
      }
      if (id === tabsHeaderIds.HOSTNAME) {
        rowValue = new URL(tab.url).hostname
      }

      return {
        value: rowValue,
        actions: [
          {
            id: 'copy-value',
            title: 'Copy value',
            onClick: () => navigator.clipboard.writeText(rowValue),
            Component: '📋'
          }
        ]
      }
    })
  })
}
