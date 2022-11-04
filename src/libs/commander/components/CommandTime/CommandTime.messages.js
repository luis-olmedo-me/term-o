import { commanderMessages } from '../../commander.messages.js'
import { parameterTypes } from '../../constants/commands.constants'

export const timeMessages = {
  ...commanderMessages,
  timeSuccess: {
    message: 'Time has passed successfully',
    type: parameterTypes.SUCCESS
  }
}
