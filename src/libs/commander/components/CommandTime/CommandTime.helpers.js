import { timeActionTypes } from './CommandTime.constants'

export const getActionType = ({ delay, interval }) => {
  if (delay) return timeActionTypes.SET_DELAY
  else if (interval) return timeActionTypes.SET_INTERVAL
  else return timeActionTypes.NONE
}
