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
    description: 'Delete a addon by name',
    validate: [options.requireAll('name')]
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
    description: 'Upload a file to add as a addon',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'name',
    abbreviation: 'n',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the name of the addon',
    validate: [options.requireAnyOf('delete')]
  })
