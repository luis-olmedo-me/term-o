import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
import { inspectHandler } from './inspect.handler'

export default new CommandBase({
  name: commandNames.INSPECT,
  handler: inspectHandler
})
  .expect({
    name: 'read',
    abbreviation: 'r',
    type: commandTypes.STRING,
    helpSection: helpSections.ACTIONS,
    description: 'Read a variable from the global context of the Tab',
    validate: [options.allow('path', 'tab-id'), options.requireAll('path')]
  })
  .expect({
    name: 'path',
    abbreviation: 'p',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a variable path',
    validate: [options.allow('tab-id')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a Tab ID where apply an action',
    validate: [value.isTabId, options.requireAnyOf('path')]
  })
