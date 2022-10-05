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
