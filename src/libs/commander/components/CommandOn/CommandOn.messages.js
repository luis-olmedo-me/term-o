import { parameterTypes } from '../../constants/commands.constants'
import { commanderMessages } from '../../commander.messages.js'

export const onMessages = {
  ...commanderMessages,
  invalidURLRegularExpressions: {
    message: 'URLs must be valid regular expressions',
    type: parameterTypes.ERROR
  },
  invalidEventType: {
    message: 'Event must be a supported event type',
    type: parameterTypes.ERROR
  },
  missingCommand: {
    message: 'Must provide a command to run',
    type: parameterTypes.ERROR
  },
  eventSaveSuccess: {
    message: 'Event(s) saved successfully',
    type: parameterTypes.SUCCESS
  }
}
