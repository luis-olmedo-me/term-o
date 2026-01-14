import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { searchHelpSections, searchHelpSectionTitles } from './search.constants'
import { inspectHandler } from './search.handler'

export default new CommandBase({
  name: commandNames.SEARCH,
  helpSectionTitles: searchHelpSectionTitles,
  handler: inspectHandler
})
  .expect({
    name: 'query',
    abbreviation: 'q',
    type: commandTypes.STRING,
    helpSection: searchHelpSections.SEARCH,
    description: 'Text query to be searched in input',
    worksWith: ['input'],
    validate: []
  })
  .expect({
    name: 'input',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: searchHelpSections.SEARCH,
    description: 'Text taken as input'
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: searchHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
