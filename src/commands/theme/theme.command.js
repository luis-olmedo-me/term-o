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
    validate: [options.mustHave('theme-json')]
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
    validate: [options.mustHave('name')]
  })
  .expect({
    name: 'apply',
    abbreviation: 'a',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Apply a theme by name',
    validate: [options.mustHave('name')]
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
    description: 'Specify the theme as a JSON string',
    validate: [value.isJSON, value.isJSONScheme(colorScheme), options.requireOneOf('import')]
  })
  .expect({
    name: 'name',
    abbreviation: 'n',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify the theme name',
    validate: [options.requireOneOf('delete', 'apply')]
  })
