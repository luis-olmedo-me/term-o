import { commanderMessages } from '../../commander.messages'
import { parameterTypes } from '../../constants/commands.constants'

export const domMessages = {
  ...commanderMessages,
  noElementsFound: {
    message: 'No elements where found in DOM.',
    type: parameterTypes.ERROR
  },
  attributeSetSuccess: {
    message: 'Attributes set successfully',
    type: parameterTypes.SUCCESS
  }
}
