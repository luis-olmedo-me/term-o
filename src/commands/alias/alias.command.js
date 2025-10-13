import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { hasItemAs, hasLength, isSpaceForbidden } from '../validators'
import { aliasHelpSections, aliasHelpSectionTitles } from './alias.constants'
import aliasHandler from './alias.handler'

export default new CommandBase({
  name: commandNames.ALIAS,
  helpSectionTitles: aliasHelpSectionTitles,
  handler: aliasHandler
})
  .expect({
    name: 'add',
    abbreviation: 'a',
    type: commandTypes.STRING_ARRAY,
    helpSection: aliasHelpSections.MANAGEMENT,
    description: 'Add a new alias. Format: ["name" "command"]',
    validate: [hasLength(2), hasItemAs(0, isSpaceForbidden)],
    worksWith: []
  })
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: aliasHelpSections.MANAGEMENT,
    description: 'List all defined aliases',
    worksWith: []
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: 'string',
    helpSection: aliasHelpSections.MANAGEMENT,
    description: 'Remove an alias by name',
    worksWith: []
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: aliasHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
