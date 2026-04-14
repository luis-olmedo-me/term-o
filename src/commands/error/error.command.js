import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { options } from '@src/helpers/validation-command.helpers'
import { errorHandler } from './error.handler'

export default new CommandBase({
  name: commandNames.ERROR,
  handler: errorHandler
})
  .expect({
    name: 'create',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Create an error',
    validate: [options.requireAll('title')]
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Throw an error with a custom message',
    validate: [options.requireAnyOf('create')]
  })
