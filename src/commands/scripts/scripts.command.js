import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { scriptsHelpSections, scriptsHelpSectionTitles } from './scripts.constants'
import scriptsHandler from './scripts.handler'

export default new CommandBase({
  name: commandNames.SCRIPTS,
  helpSectionTitles: scriptsHelpSectionTitles,
  handler: scriptsHandler
})
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: scriptsHelpSections.MANAGEMENT,
    description: 'List all scripts',
    worksWith: []
  })
  .expect({
    name: 'upload',
    abbreviation: 'u',
    type: commandTypes.BOOLEAN,
    helpSection: scriptsHelpSections.MANAGEMENT,
    description: 'Upload a file to add as a script',
    worksWith: []
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: 'string',
    helpSection: scriptsHelpSections.MANAGEMENT,
    description: 'Delete a script by name',
    worksWith: []
  })
  .expect({
    name: 'run',
    abbreviation: 'r',
    type: 'string',
    helpSection: scriptsHelpSections.EXECUTION,
    description: 'Run a script by name',
    worksWith: []
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: scriptsHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
