import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { isRegExp } from '@src/helpers/validation-command.helpers'
import { searchHelpSections } from './search.constants'
import { searchHandler } from './search.handler'

export default new CommandBase({
  name: commandNames.SEARCH,
  handler: searchHandler
})
  .expect({
    name: 'query',
    abbreviation: 'q',
    type: commandTypes.STRING,
    helpSection: searchHelpSections.SEARCH,
    description: 'Text query to be searched in input (regex)',
    worksWith: ['input'],
    validate: [isRegExp],
    defaultValue: ''
  })
  .expect({
    name: 'input',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: searchHelpSections.SEARCH,
    description: 'Text taken as input'
  })
