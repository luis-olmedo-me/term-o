import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { array, options, value } from '@src/helpers/validation-command.helpers'
import { aliasHelpSections } from './alias.constants'
import { aliasHandler } from './alias.handler'

export default new CommandBase({
  name: commandNames.ALIAS,
  handler: aliasHandler
})
  .expect({
    name: 'add',
    abbreviation: 'a',
    type: commandTypes.ARRAY,
    helpSection: aliasHelpSections.MANAGEMENT,
    description: 'Add a new alias. Format: ["name" "command"]',
    validate: [
      array.hasAllItemsAs(
        value.isArray,
        array.hasLength(2),
        array.hasAllItemsAs(value.isString),
        array.hasItemAs(0, value.isSpaceForbidden)
      ),
      options.requireNoOther
    ],
    repeatable: true
  })
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: aliasHelpSections.MANAGEMENT,
    description: 'List all defined aliases',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: commandTypes.STRING,
    helpSection: aliasHelpSections.MANAGEMENT,
    description: 'Remove an alias by name',
    validate: [options.requireNoOther]
  })
