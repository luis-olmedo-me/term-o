import { tabsActionTypes } from './CommandTabs.constants'

export const getActionType = ({ current, history }) => {
  if (current) return tabsActionTypes.SHOW_CURRENT_TABS
  if (history) return tabsActionTypes.SHOW_HISTORY
  else return tabsActionTypes.NONE
}
