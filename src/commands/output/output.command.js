import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { options } from '@src/helpers/validation-command.helpers'
import { outputHandler } from './output.handler'

export default new CommandBase({
  name: commandNames.OUTPUT,
  handler: outputHandler
})
  .expect({
    name: 'log',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Log a value',
    validate: [options.requireAll('value')]
  })
  .expect({
    name: 'value',
    abbreviation: 'v',
    type: commandTypes.ARRAY,
    helpSection: helpSections.DETAILS,
    description: 'Define the value',
    validate: [options.requireAnyOf('log')]
  })
