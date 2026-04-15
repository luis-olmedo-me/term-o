import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
import { colorScheme } from './theme.constants'
import { themeHandler } from './theme.handler'

export default new CommandBase({
  name: commandNames.THEME,
  handler: themeHandler
})
  .expect({
    name: 'import',
    abbreviation: 'i',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Import a color scheme in JSON format',
    validate: [options.requireAll('theme-json')]
  })
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'List all available themes',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Delete a theme by its name',
    validate: [options.requireAll('name')]
  })
  .expect({
    name: 'apply',
    abbreviation: 'a',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Apply a theme by name',
    validate: [options.requireAll('name')]
  })
  .expect({
    name: 'current',
    abbreviation: 'C',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Show the currently applied theme',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'theme-json',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the Theme in JSON-String',
    validate: [value.isJSON, value.isJSONScheme(colorScheme), options.requireAnyOf('import')]
  })
  .expect({
    name: 'name',
    abbreviation: 'n',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the name of the theme',
    validate: [value.isSpaceForbidden, options.requireAnyOf('delete', 'apply')]
  })
