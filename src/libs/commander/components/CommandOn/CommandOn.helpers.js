import { onActionTypes } from './CommandOn.constants'

export const checkIfRegExpIsValid = (regExp) => {
  try {
    new RegExp(regExp)
    return true
  } catch (error) {
    return false
  }
}

export const getActionType = ({ run }) => {
  if (run.length) return onActionTypes.ADD_EVENT
  else return onActionTypes.NONE
}
