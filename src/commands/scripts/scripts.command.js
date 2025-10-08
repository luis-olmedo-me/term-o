import CommandBase from '@src/templates/CommandBase'

import { commandNames } from '@src/constants/command.constants'
import { scriptsHelpSections, scriptsHelpSectionTitles } from './scripts.constants'

export default new CommandBase({
  name: commandNames.SCRIPTS,
  helpSectionTitles: scriptsHelpSectionTitles
})
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    helpSection: scriptsHelpSections.MANAGEMENT,
    worksWith: [],
    description: 'List all scripts'
  })
  .expect({
    name: 'upload',
    type: 'boolean',
    abbreviation: 'u',
    helpSection: scriptsHelpSections.MANAGEMENT,
    worksWith: [],
    description: 'Upload a file to add as a script'
  })
  .expect({
    name: 'delete',
    type: 'string',
    abbreviation: 'd',
    helpSection: scriptsHelpSections.MANAGEMENT,
    worksWith: [],
    description: 'Delete a script by name'
  })
  .expect({
    name: 'run',
    type: 'string',
    abbreviation: 'r',
    helpSection: scriptsHelpSections.EXECUTION,
    worksWith: [],
    description: 'Run a script by name'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    helpSection: scriptsHelpSections.GENERAL,
    worksWith: [],
    description: 'Show help for this command'
  })
