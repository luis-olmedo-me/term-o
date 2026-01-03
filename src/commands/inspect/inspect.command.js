import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { inspectHelpSectionTitles, inspectHelpSections } from './inspect.constants'
import { inspectHandler } from './inspect.handler'

export default new CommandBase({
  name: commandNames.INSPECT,
  helpSectionTitles: inspectHelpSectionTitles,
  handler: inspectHandler
})
  .expect({
    name: 'path',
    abbreviation: 'p',
    type: commandTypes.STRING,
    helpSection: inspectHelpSections.SEARCH,
    description: 'Throw an error with a custom message',
    worksWith: []
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: inspectHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
