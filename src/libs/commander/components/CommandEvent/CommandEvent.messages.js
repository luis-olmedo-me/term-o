import { commanderMessages } from '../../commander.messages.js'
import { parameterTypes } from '../../constants/commands.constants'

export const eventMessages = {
  ...commanderMessages,
  invalidEventIds: {
    message: 'Some of the event ids you provided are invalid.',
    type: parameterTypes.ERROR
  },
  eventDeleteSuccess: {
    message: 'Event(s) deleted successfully',
    type: parameterTypes.SUCCESS
  },
  noEventsFound: {
    message: 'There are no page events registered.',
    type: parameterTypes.INFO
  },
  elementsClickedSuccess: {
    message: 'All DOM elements provided has been clicked.',
    type: parameterTypes.SUCCESS
  },
  elementsChangedSuccess: {
    message: 'All DOM elements provided has been changed.',
    type: parameterTypes.SUCCESS
  },
  invalidEventName: {
    message: 'The event name provided is not supported.',
    type: parameterTypes.ERROR
  },
  invalidElements: {
    message: 'The elements provided are not inputs.',
    type: parameterTypes.ERROR
  },
  missingElements: {
    message: 'No DOM elements were provided.',
    type: parameterTypes.ERROR
  }
}
