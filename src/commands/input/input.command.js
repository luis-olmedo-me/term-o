import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { options } from '@src/helpers/validation-command.helpers'
import { inputHandler } from './input.handler'

export default new CommandBase({
  name: commandNames.INPUT,
  handler: inputHandler
}).expect({
  name: 'text',
  abbreviation: 't',
  type: commandTypes.BOOLEAN,
  helpSection: helpSections.ACTIONS,
  description: 'Request user input in terminal',
  validate: [options.requireNoOther]
})
