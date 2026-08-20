import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { options } from '@src/helpers/validation-command.helpers'
import { addonsHandler } from './addons.handler'

export default new CommandBase({
  name: commandNames.ADDONS,
  handler: addonsHandler
})
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Delete an addon by name',
    validate: [options.mustHave('name')]
  })
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'List all addons',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'upload',
    abbreviation: 'u',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Upload an addon file',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'name',
    abbreviation: 'n',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify the addon name',
    validate: [options.requireOneOf('delete')]
  })
