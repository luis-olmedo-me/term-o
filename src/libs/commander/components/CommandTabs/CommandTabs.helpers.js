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
  const date = new Date(byDate)
  const dateOffset = date.getTimezoneOffset()
  const time = date.getTime()
  const timeMinusDay = time && time - microsecondsPerDay + dateOffset

  const startDate = timeMinusDay || null
  const endDate = time || null

  return {
    text: byText,
    startTime: startDate,
    endTime: endDate
  }
}
