import { onActionTypes } from './CommandOn.constants'

export const checkIfRegExpIsValid = (regExp) => {
  try {
    new RegExp(regExp)
    return true
  } catch (error) {
    return false
  }
}

export const getActionType = ({ url, run, event }) => {
  if (run.length || url.length || event) return onActionTypes.ADD_EVENT
  else return onActionTypes.NONE
}
