import { onActionTypes } from './CommandOn.constants'

export const getActionType = ({ run }) => {
  if (run.length) return onActionTypes.ADD_EVENT
  else return onActionTypes.NONE
}
