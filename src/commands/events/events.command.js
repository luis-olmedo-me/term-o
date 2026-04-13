import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { eventsSupported } from '@src/constants/options.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
import { eventsHelpSections } from './events.constants'
import { eventsHandler } from './events.handler'

export default new CommandBase({
  name: commandNames.EVENTS,
  handler: eventsHandler
})
  .expect({
    name: 'register',
    abbreviation: 'r',
    type: commandTypes.BOOLEAN,
    helpSection: eventsHelpSections.CREATION,
    description: 'Register a new command for future execution',
    validate: [options.requireAll('url', 'command')]
  })
  .expect({
    name: 'trigger',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: eventsHelpSections.CREATION,
    description: 'Trigger a new event in page',
    validate: [
      value.isAnyOf(eventsSupported),
      options.allow('xpath', 'tab-id'),
      options.requireAll('xpath')
    ]
  })
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: eventsHelpSections.MANAGEMENT,
    description: 'List all registered events',
    validate: [options.requireNoOther()]
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: commandTypes.STRING,
    helpSection: eventsHelpSections.MANAGEMENT,
    description: 'Delete a registered event by its id',
    validate: [options.requireNoOther()]
  })
  .expect({
    name: 'xpath',
    abbreviation: 'x',
    type: commandTypes.STRING,
    helpSection: eventsHelpSections.CREATION,
    description: 'XPath selector for the target element',
    validate: [options.requireAnyOf('trigger')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: eventsHelpSections.CREATION,
    description: 'Trigger events in a specific tab (T[number])',
    validate: [value.isTabId, options.requireAnyOf('trigger')]
  })
  .expect({
    name: 'url',
    abbreviation: 'u',
    type: commandTypes.STRING,
    helpSection: eventsHelpSections.CREATION,
    description: 'URL pattern where the event will trigger (regex)',
    validate: [value.isRegExp, options.requireAnyOf('register')]
  })
  .expect({
    name: 'command',
    abbreviation: 'c',
    type: commandTypes.STRING,
    helpSection: eventsHelpSections.CREATION,
    description: 'Command line to execute',
    validate: [options.requireAnyOf('register')]
  })
