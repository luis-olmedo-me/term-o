import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
import { colorScheme, themeHelpSections } from './theme.constants'
import { themeHandler } from './theme.handler'

export default new CommandBase({
  name: commandNames.THEME,
  handler: themeHandler
})
  .expect({
    name: 'import',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: themeHelpSections.MANAGEMENT,
    description: 'Import a color scheme in JSON format',
    validate: [value.isJSONScheme(colorScheme), options.requireNoOther]
  })
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: themeHelpSections.MANAGEMENT,
    description: 'List all available themes',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: commandTypes.STRING,
    helpSection: themeHelpSections.MANAGEMENT,
    description: 'Delete a theme by name',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'apply',
    abbreviation: 'a',
    type: commandTypes.STRING,
    helpSection: themeHelpSections.APPLICATION,
    description: 'Apply a theme by name',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'current',
    abbreviation: 'C',
    type: commandTypes.BOOLEAN,
    helpSection: themeHelpSections.APPLICATION,
    description: 'Show the currently applied theme',
    validate: [options.requireNoOther]
  })
