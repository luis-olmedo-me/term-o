import CommandBase from '@src/templates/CommandBase'

import { commandNames } from '@src/constants/command.constants'
import { isDate, isInteger, isPositive, isRegExp } from '../validators'
import { historyHelpSections, historyHelpSectionTitles } from './history.constants'

export default new CommandBase({
  name: commandNames.HISTORY,
  helpSectionTitles: historyHelpSectionTitles
})
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    helpSection: historyHelpSections.GENERAL,
    worksWith: ['title', 'url', 'max-results', 'from', 'to'],
    description: 'Show a list of previously opened pages'
  })
  .expect({
    name: 'title',
    type: 'string',
    abbreviation: 't',
    helpSection: historyHelpSections.FILTERS,
    description: 'Filter pages by title (supports regular expressions)',
    validate: [isRegExp]
  })
  .expect({
    name: 'url',
    type: 'string',
    abbreviation: 'u',
    helpSection: historyHelpSections.FILTERS,
    description: 'Filter pages by URL (supports regular expressions)',
    validate: [isRegExp]
  })
  .expect({
    name: 'max-results',
    type: 'number',
    abbreviation: 'r',
    helpSection: historyHelpSections.FILTERS,
    description: 'Limit the number of items displayed',
    validate: [isPositive, isInteger],
    defaultValue: 0
  })
  .expect({
    name: 'delete',
    type: 'boolean',
    abbreviation: 'd',
    helpSection: historyHelpSections.MANAGEMENT,
    description: 'Delete pages in a specific date range',
    worksWith: ['from', 'to'],
    mustHave: ['from', 'to']
  })
  .expect({
    name: 'from',
    type: 'string',
    abbreviation: 'F',
    helpSection: historyHelpSections.FILTERS,
    description: 'Start date for deletion or filtering',
    validate: [isDate]
  })
  .expect({
    name: 'to',
    type: 'string',
    abbreviation: 'T',
    helpSection: historyHelpSections.FILTERS,
    description: 'End date for deletion or filtering',
    validate: [isDate]
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    helpSection: historyHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
