import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { addonsHelpSectionTitles, addonsHelpSections } from './addons.constants'
import { addonsHandler } from './addons.handler'

export default new CommandBase({
  name: commandNames.ADDONS,
  helpSectionTitles: addonsHelpSectionTitles,
  handler: addonsHandler
})
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: addonsHelpSections.MANAGEMENT,
    description: 'List all addons',
    worksWith: []
  })
  .expect({
    name: 'upload',
    abbreviation: 'u',
    type: commandTypes.BOOLEAN,
    helpSection: addonsHelpSections.MANAGEMENT,
    description: 'Upload a file to add as a addon',
    worksWith: []
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: commandTypes.STRING,
    helpSection: addonsHelpSections.MANAGEMENT,
    description: 'Delete a addon by name',
    worksWith: []
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: addonsHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
