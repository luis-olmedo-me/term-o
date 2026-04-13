import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
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
    validate: [value.isRegExp, options.requireAll('input')]
  })
  .expect({
    name: 'input',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: searchHelpSections.SEARCH,
    description: 'Text taken as input',
    validate: [options.requireAnyOf('query')]
  })
