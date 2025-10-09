import CommandBase from '@src/templates/CommandBase'

import { commandNames } from '@src/constants/command.constants'
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
    type: 'string',
    abbreviation: 'i',
    helpSection: themeHelpSections.MANAGEMENT,
    validate: [isJSONScheme(colorScheme)],
    worksWith: [],
    description: 'Import a color scheme in JSON format'
  })
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    helpSection: themeHelpSections.MANAGEMENT,
    worksWith: [],
    description: 'List all available themes'
  })
  .expect({
    name: 'delete',
    type: 'string',
    abbreviation: 'd',
    helpSection: themeHelpSections.MANAGEMENT,
    worksWith: [],
    description: 'Delete a theme by name'
  })
  .expect({
    name: 'apply',
    type: 'string',
    abbreviation: 'a',
    helpSection: themeHelpSections.APPLICATION,
    worksWith: [],
    description: 'Apply a theme by name'
  })
  .expect({
    name: 'current',
    type: 'boolean',
    abbreviation: 'C',
    helpSection: themeHelpSections.APPLICATION,
    worksWith: [],
    description: 'Show the currently applied theme'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    helpSection: themeHelpSections.GENERAL,
    worksWith: [],
    description: 'Show help for this command'
  })
