import { actionTypes } from '../../constants/commands.constants'

export const getActionType = ({ list, delete: deletedIds }) => {
  if (deletedIds.length) return actionTypes.DELETE_EVENT
  else if (list) return actionTypes.SHOW_LIST
  else return actionTypes.NONE
}
