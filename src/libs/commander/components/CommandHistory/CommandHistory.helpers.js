import { actionTypes } from '../../constants/commands.constants'

export const getActionType = ({ goto, protocol }) => {
  if (goto.length) return actionTypes.REDIRECT
  else if (protocol) return actionTypes.SHOW_LIST
  else return actionTypes.NONE
}
