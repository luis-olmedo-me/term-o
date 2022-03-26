import { actionTypes } from '../../constants/commands.constants'

export const checkIfRegExpIsValid = (regExp) => {
  try {
    new RegExp(regExp)
    return true
  } catch (error) {
    return false
  }
}

export const getActionType = ({ url, run }) => {
  if (run.length || url.length) return actionTypes.ADD_EVENT
  else return actionTypes.NONE
}
