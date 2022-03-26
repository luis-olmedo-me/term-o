import { actionTypes } from '../../constants/commands.constants'

export const getActionType = ({ goto, protocol }) => {
  if (goto.length || protocol) return actionTypes.REDIRECT
  else return actionTypes.NONE
}
