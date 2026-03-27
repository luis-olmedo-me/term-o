import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { inputHelpSections } from './input.constants'
import { inputHandler } from './input.handler'

export default new CommandBase({
  name: commandNames.INPUT,
  handler: inputHandler
})
  .expect({
    name: 'text',
    abbreviation: 't',
    type: commandTypes.BOOLEAN,
    helpSection: inputHelpSections.ACTIONS,
    description: 'Request user input in terminal.',
    worksWith: []
  })
  .expect({
    name: 'measure',
    abbreviation: 'm',
    type: commandTypes.BOOLEAN,
    helpSection: inputHelpSections.ACTIONS,
    description: 'Request measure from terminal.',
    worksWith: []
  })
