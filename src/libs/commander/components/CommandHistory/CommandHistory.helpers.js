import { historyActionTypes } from './CommandHistory.constants'

export const getActionType = ({ goto, protocol, list }) => {
  if (list) return historyActionTypes.SHOW_LIST
  else if (goto.length || protocol) return historyActionTypes.REDIRECT
  else return historyActionTypes.NONE
}
