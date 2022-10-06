import { tabsActionTypes } from './CommandTabs.constants'

export const getActionType = ({ current, history, open }) => {
  if (current) return tabsActionTypes.SHOW_CURRENT_TABS
  if (history) return tabsActionTypes.SHOW_HISTORY
  if (open) return tabsActionTypes.REDIRECT
  else return tabsActionTypes.NONE
}

export const parseHistorial = (historial) => {
  return historial.map(({ lastVisitTime, url, title }) => {
    const hostName = new URL(url).hostname

    return {
      lastVisitTime,
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
  byDate
}) => {
  let filters = { text: byText }

  if (byDate) {
    const date = new Date(byDate)
    const startOffset = date.getTimezoneOffset()
    const baseTime = date.getTime()

    const startTime = baseTime && baseTime + startOffset - microsecondsPerDay
    const endTime = baseTime && baseTime + startOffset

    filters = {
      ...filters,
      startTime: startTime || null,
      endTime: endTime || null
    }
  }
  if (byStartDate || byEndDate) {
    const startDate = new Date(byStartDate)
    const startOffset = startDate.getTimezoneOffset()
    const startTime = startDate.getTime() + startOffset

    const endDate = new Date(byEndDate)
    const endOffset = endDate.getTimezoneOffset()
    const endTime = endDate.getTime() + endOffset

    filters = {
      ...filters,
      startTime: startTime || null,
      endTime: endTime || null
    }
  }

  return filters
}
