import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { inputHelpSections } from './input.constants'
import { inputHandler } from './input.handler'

export default new CommandBase({
  name: commandNames.INPUT,
  handler: inputHandler
})
  .expect({
    name: 'request',
    abbreviation: 'r',
    type: commandTypes.BOOLEAN,
    helpSection: inputHelpSections.ACTIONS,
    description: 'Request user input in terminal.',
    worksWith: ['title']
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: inputHelpSections.ACTIONS,
    description: 'Define a title for the user input request.',
    worksWith: null
  })
