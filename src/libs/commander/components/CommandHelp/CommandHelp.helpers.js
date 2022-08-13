import { helpActionTypes } from './CommandHelp.constants'

export const getActionType = ({ about }) => {
  if (about.length) return helpActionTypes.HELP
  else return helpActionTypes.NONE
}
