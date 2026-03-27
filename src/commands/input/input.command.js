import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { isTabId } from '@src/helpers/validation-command.helpers'
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
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: inputHelpSections.ACTIONS,
    description: 'Specify a tab ID to take action on',
    validate: [isTabId]
  })
