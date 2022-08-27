import { notifyActionTypes } from './CommandNotify.constants'

export const getActionType = ({ message }) => {
  if (message) return notifyActionTypes.NOTIFY
  else return notifyActionTypes.NONE
}
