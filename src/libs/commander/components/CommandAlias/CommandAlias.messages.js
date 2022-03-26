import { parameterTypes } from '../../constants/commands.constants'
import { commanderMessages } from '../../commander.messages.js'

export const aliasMessages = {
  ...commanderMessages,
  noAliasesFound: {
    message: 'There are no aliases registered.',
    type: parameterTypes.INFO
  },
  invalidAliases: {
    message: 'Invalid alias(es).',
    type: parameterTypes.ERROR
  },
  aliasAdditionSuccess: {
    message: 'Alias(es) added successfully.',
    type: parameterTypes.SUCCESS
  },
  noAliasIdsFound: {
    type: parameterTypes.ERROR,
    message: `Some of the aliases you're trying to delete don't exist.`
  },
  aliasDeletionSuccess: {
    message: 'Alias(es) deleted successfully.',
    type: parameterTypes.SUCCESS
  }
}
