import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
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
    validate: [options.requireAll('name', 'command')]
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
    validate: [value.isSpaceForbidden, options.requireAnyOf('add', 'delete')]
  })
  .expect({
    name: 'command',
    abbreviation: 'c',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the command associated with the alias',
    validate: [options.requireAnyOf('add')]
  })
