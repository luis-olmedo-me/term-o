import { parameterTypes } from '../../constants/commands.constants'

export const historyMessages = {
  missingURL: {
    message: 'No url has been provided.',
    type: parameterTypes.ERROR
  },
  redirectionSuccess: {
    message: 'Successfully opened {urlCount} url(s).',
    type: parameterTypes.SUCCESS
  }
}
