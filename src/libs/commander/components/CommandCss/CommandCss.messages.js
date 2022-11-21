import { commanderMessages } from '../../commander.messages.js'
import { parameterTypes } from '../../constants/commands.constants'

export const cssMessages = {
  ...commanderMessages,
  invalidStyle: {
    message: `Some of the styles you provided are invalid.`,
    type: parameterTypes.ERROR
  },
  parameterOverflow: {
    message: `There are many elements in parameters. Only one is allowed.`,
    type: parameterTypes.ERROR
  }
}
