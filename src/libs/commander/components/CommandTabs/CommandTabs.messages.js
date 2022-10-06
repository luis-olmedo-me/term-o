import { parameterTypes } from '../../constants/commands.constants'

export const tabsMessages = {
  missingURL: {
    message: 'No url has been provided.',
    type: parameterTypes.ERROR
  },
  redirectionSuccess: {
    message: 'The url has been successfully open.',
    type: parameterTypes.SUCCESS
  },
  noTabsFound: {
    message: 'No tabs where found.',
    type: parameterTypes.ERROR
  }
}
