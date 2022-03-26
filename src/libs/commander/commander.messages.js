import { parameterTypes } from './constants/commands.constants'

export const commanderMessages = {
  unknownCommandError: {
    message: 'The command you entered is not recognized. Please try again.',
    type: parameterTypes.ERROR
  },
  unexpectedError: {
    message: 'An unexpected error occurred. Please try again.',
    type: parameterTypes.ERROR
  }
}
