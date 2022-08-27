import { tabsActionTypes } from './CommandTabs.constants'

export const getActionType = ({ list }) => {
  if (list) return tabsActionTypes.SHOW_TAB_LIST
  else return tabsActionTypes.NONE
}
