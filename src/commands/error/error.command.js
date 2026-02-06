import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { errorHelpSections } from './error.constants'
import { errorHandler } from './error.handler'

export default new CommandBase({
  name: commandNames.ERROR,
  handler: errorHandler
}).expect({
  name: 'title',
  abbreviation: 't',
  type: commandTypes.STRING,
  helpSection: errorHelpSections.ACTIONS,
  description: 'Throw an error with a custom message',
  worksWith: []
})
