import { parameterTypes } from '../../constants/commands.constants'
import { commanderMessages } from '../../commander.messages.js'

export const inspectMessages = {
  ...commanderMessages,
  notificationSuccess: {
    message: 'The notifications has been created successfully',
    type: parameterTypes.SUCCESS
  }
}
