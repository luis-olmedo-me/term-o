import { tabsActionTypes } from './CommandTabs.constants'

export const getActionType = ({ current }) => {
  if (current) return tabsActionTypes.SHOW_CURRENT_TABS
  else return tabsActionTypes.NONE
}
