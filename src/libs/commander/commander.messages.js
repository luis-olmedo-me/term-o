import { parameterTypes } from './constants/commands.constants'

export const commanderMessages = {
  unknownCommandError: {
    message: 'The command you entered is not recognized. Please try again.',
    type: parameterTypes.ERROR
  },
  unexpectedError: {
    message: 'An unexpected error occurred. Please try again.',
    type: parameterTypes.ERROR
  },
  invalidRegex: {
    message: 'The regular expression you provided is not valid. Please try again.',
    type: parameterTypes.ERROR
  },
  noParameters: {
    message: 'Elements in parameters are required.',
    type: parameterTypes.ERROR
  },
  contextError: {
    message: 'Worker connection lost, please refresh the window.',
    type: parameterTypes.ERROR
  }
}
