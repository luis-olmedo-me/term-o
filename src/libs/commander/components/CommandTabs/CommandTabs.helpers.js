import { tabsActionTypes } from './CommandTabs.constants'

export const getActionType = ({ current, history, goto }) => {
  if (current) return tabsActionTypes.SHOW_CURRENT_TABS
  if (history) return tabsActionTypes.SHOW_HISTORY
  if (goto.length) return tabsActionTypes.REDIRECT
  else return tabsActionTypes.NONE
}
