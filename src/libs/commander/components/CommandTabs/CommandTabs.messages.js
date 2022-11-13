import { commanderMessages } from '../../commander.messages'
import { parameterTypes } from '../../constants/commands.constants'

export const tabsMessages = {
  ...commanderMessages,
  missingURL: {
    message: 'No url has been provided.',
    type: parameterTypes.ERROR
  },
  redirectionSuccess: {
    message: 'The url has been successfully open.',
    type: parameterTypes.SUCCESS
  },
  closeSuccess: {
    message: 'The tab has been successfully closed.',
    type: parameterTypes.SUCCESS
  },
  goSuccess: {
    message: 'You got back in the page successfully.',
    type: parameterTypes.SUCCESS
  },
  reloadSuccess: {
    message: 'The page is being reloaded.',
    type: parameterTypes.SUCCESS
  },
  noTabsFound: {
    message: 'No tabs where found.',
    type: parameterTypes.ERROR
  }
}
