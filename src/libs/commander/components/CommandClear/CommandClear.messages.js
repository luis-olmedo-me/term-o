import { parameterTypes } from '../../constants/commands.constants'
import { commanderMessages } from '../../commander.messages.js'

export const clearMessages = {
  ...commanderMessages,
  configurationResetSuccess: {
    message: 'Configuration has been resetted successfully',
    type: parameterTypes.SUCCESS
  }
}
