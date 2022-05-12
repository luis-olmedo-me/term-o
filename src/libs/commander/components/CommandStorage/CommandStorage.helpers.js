import { actionTypes } from '../../constants/commands.constants'

export const getActionType = ({ local }) => {
  if (local) return actionTypes.LOCAL_STORAGE
  return actionTypes.NONE
}
