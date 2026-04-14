import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { array, options, value } from '@src/helpers/validation-command.helpers'
import { aliasHandler } from './alias.handler'

export default new CommandBase({
  name: commandNames.ALIAS,
  handler: aliasHandler
})
  .expect({
    name: 'add',
    abbreviation: 'a',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Add a new alias and the associated command',
    validate: [options.requireAll('alias')]
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Remove an alias by name',
    validate: [options.requireAll('name')]
  })
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'List all defined aliases',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'name',
    abbreviation: 'n',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the name of the alias',
    validate: [value.isSpaceForbidden, options.requireAnyOf('delete')]
  })
  .expect({
    name: 'alias',
    abbreviation: 'A',
    type: commandTypes.ARRAY,
    helpSection: helpSections.DETAILS,
    description: 'Define a name-command pair',
    repeatable: true,
    validate: [
      array.hasAllItemsAs(
        value.isArray,
        array.hasLength(2),
        array.hasAllItemsAs(value.isString),
        array.hasItemAs(0, value.isSpaceForbidden)
      ),
      options.requireAnyOf('add')
    ]
  })
