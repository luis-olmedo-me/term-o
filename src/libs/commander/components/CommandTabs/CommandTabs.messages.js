import { parameterTypes } from '../../constants/commands.constants'

export const tabsMessages = {
  missingURL: {
    message: 'No url has been provided.',
    type: parameterTypes.ERROR
  },
  redirectionSuccess: {
    message: 'Successfully opened {urlCount} url(s).',
    type: parameterTypes.SUCCESS
  },
  noTabsFound: {
    message: 'No tabs where found.',
    type: parameterTypes.ERROR
  }
}
