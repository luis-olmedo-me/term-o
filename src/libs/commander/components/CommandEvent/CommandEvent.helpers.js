import { eventActionTypes } from './CommandEvent.constants'

export const getActionType = ({ list, delete: deletedIds, trigger }) => {
  if (trigger.length) return eventActionTypes.TRIGGER
  else if (deletedIds.length) return eventActionTypes.DELETE_EVENT
  else if (list) return eventActionTypes.SHOW_LIST
  else return eventActionTypes.NONE
}
