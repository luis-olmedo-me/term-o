import { parameterTypes } from '../../constants/commands.constants'
import { commanderMessages } from '../../commander.messages.js'

export const storageMessages = {
  ...commanderMessages,
  emptyStorage: {
    message: 'Storage is empty',
    type: parameterTypes.INFO
  }
}
