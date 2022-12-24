import { formatDate } from '@src/helpers/dates.helpers'
import { tabsActionTypes } from './CommandTabs.constants'

export const getActionType = ({ now, past, open, close, reload, go, permissions }) => {
  if (permissions) return tabsActionTypes.SHOW_PERMISSIONS
  if (reload) return tabsActionTypes.RELOAD_TAB
  if (go) return tabsActionTypes.GO
  if (close.length) return now ? tabsActionTypes.CLOSE_OPEN_TABS : tabsActionTypes.NONE
  if (now) return tabsActionTypes.SHOW_CURRENT_TABS
  if (past) return tabsActionTypes.SHOW_HISTORY
  if (open) return tabsActionTypes.REDIRECT
  return tabsActionTypes.NONE
}

const microsecondsPerDay = 1000 * 60 * 60 * 24
export const validateHistoryFilters = ({ byText, byStartDate, byEndDate, byDate, maxResults }) => {
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
  return tabsOpen.map(tab => {
    const isDateValueString = typeof tab.date === 'string'

    return {
      ...tab,
      date: isDateValueString ? tab.date : formatDate(tab.date, 'dd/MM/yyyy hh:mm:ss'),
      hostname: new URL(tab.url).hostname
    }
  })
}
