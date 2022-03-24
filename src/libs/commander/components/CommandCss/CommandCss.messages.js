import { parameterTypes } from '../../constants/commands.constants'

export const cssMessages = {
  invalidStyle: {
    message: `Some of the styles you provided are invalid: "{invalidStyleNames}".`,
    type: parameterTypes.ERROR
  }
}
