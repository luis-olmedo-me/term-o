import { actionTypes } from '../../constants/commands.constants'

export const getActionType = ({ config }) => {
  if (config) return actionTypes.CLEAR_CONFIG
  else return actionTypes.CLEAR_TERMINAL
}
