import CommandBase from '@src/templates/CommandBase'

import { commandNames } from '@src/constants/command.constants'
import { hasItemAs, hasLength, isSpaceForbidden } from '../validators'
import { aliasHelpSections, aliasHelpSectionTitles } from './alias.constants'

export default new CommandBase({
  name: commandNames.ALIAS,
  helpSectionTitles: aliasHelpSectionTitles
})
  .expect({
    name: 'add',
    type: 'string-array',
    abbreviation: 'a',
    validate: [hasLength(2), hasItemAs(0, isSpaceForbidden)],
    worksWith: [],
    helpSection: aliasHelpSections.MANAGEMENT,
    description: 'Add a new alias. Format: ["name" "command"]'
  })
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    worksWith: [],
    helpSection: aliasHelpSections.MANAGEMENT,
    description: 'List all defined aliases'
  })
  .expect({
    name: 'delete',
    type: 'string',
    abbreviation: 'd',
    worksWith: [],
    helpSection: aliasHelpSections.MANAGEMENT,
    description: 'Remove an alias by name'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    helpSection: aliasHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
