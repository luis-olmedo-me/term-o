import { parameterTypes } from '../../constants/commands.constants'
import { commanderMessages } from '../../commander.messages.js'

export const cssMessages = {
  ...commanderMessages,
  invalidStyle: {
    message: `Some of the styles you provided are invalid: "{invalidStyleNames}".`,
    type: parameterTypes.ERROR
  },
  parameterOverflow: {
    message: `There are many elements in parameters. Only one is allowed.`,
    type: parameterTypes.ERROR
  },
  noParameters: {
    message: `Elements in parameters are required.`,
    type: parameterTypes.ERROR
  }
}
