import { commanderMessages } from '../../commander.messages.js'
import { parameterTypes } from '../../constants/commands.constants'

export const timeMessages = {
  ...commanderMessages,
  notificationSuccess: {
    message: 'The notifications has been created successfully',
    type: parameterTypes.SUCCESS
  }
}
