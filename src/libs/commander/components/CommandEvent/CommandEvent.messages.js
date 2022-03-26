import { parameterTypes } from '../../constants/commands.constants'
import { commanderMessages } from '../../commander.messages.js'

export const eventMessages = {
  ...commanderMessages,
  invalidEventIds: {
    message: 'The following ids were not found: {invalidIds}',
    type: parameterTypes.ERROR
  },
  eventDeleteSuccess: {
    message: 'Event(s) deleted successfully',
    type: parameterTypes.SUCCESS
  },
  noEventsFound: {
    message: 'There are no page events registered.',
    type: parameterTypes.INFO
  }
}
