import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
import { inspectHelpSections } from './inspect.constants'
import { inspectHandler } from './inspect.handler'

export default new CommandBase({
  name: commandNames.INSPECT,
  handler: inspectHandler
})
  .expect({
    name: 'path',
    abbreviation: 'p',
    type: commandTypes.STRING,
    helpSection: inspectHelpSections.SEARCH,
    description: 'Read a variable path in the current tab',
    validate: [options.allow('tab-id')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: inspectHelpSections.SEARCH,
    description: 'Search variable in a specific tab (T[number])',
    validate: [value.isTabId, options.requireAnyOf('path')]
  })
