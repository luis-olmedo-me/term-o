import { timeActionTypes } from './CommandTime.constants'

export const getActionType = ({ delay }) => {
  if (delay) return timeActionTypes.SET_DELAY
  else return timeActionTypes.NONE
}
