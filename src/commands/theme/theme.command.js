import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { isJSONScheme } from '../validators'
import { colorScheme, themeHelpSections, themeHelpSectionTitles } from './theme.constants'
import themeHandler from './theme.handler'

export default new CommandBase({
  name: commandNames.THEME,
  helpSectionTitles: themeHelpSectionTitles,
  handler: themeHandler
})
  .expect({
    name: 'import',
    abbreviation: 'i',
    type: 'string',
    helpSection: themeHelpSections.MANAGEMENT,
    description: 'Import a color scheme in JSON format',
    worksWith: [],
    validate: [isJSONScheme(colorScheme)]
  })
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: themeHelpSections.MANAGEMENT,
    description: 'List all available themes',
    worksWith: []
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: 'string',
    helpSection: themeHelpSections.MANAGEMENT,
    description: 'Delete a theme by name',
    worksWith: []
  })
  .expect({
    name: 'apply',
    abbreviation: 'a',
    type: 'string',
    helpSection: themeHelpSections.APPLICATION,
    description: 'Apply a theme by name',
    worksWith: []
  })
  .expect({
    name: 'current',
    abbreviation: 'C',
    type: commandTypes.BOOLEAN,
    helpSection: themeHelpSections.APPLICATION,
    description: 'Show the currently applied theme',
    worksWith: []
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: themeHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
