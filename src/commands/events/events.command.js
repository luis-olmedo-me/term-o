import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { availableEventValues } from '@src/constants/events.constants'
import { domEventsSupported } from '@src/constants/options.constants'
import { array, options, value } from '@src/helpers/validation-command.helpers'
import { eventsHandler } from './events.handler'

export default new CommandBase({
  name: commandNames.EVENTS,
  handler: eventsHandler
})
  .expect({
    name: 'register',
    abbreviation: 'r',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Register a new command for future execution',
    validate: [options.requireAll('event')]
  })
  .expect({
    name: 'dom-dispatch',
    abbreviation: 'D',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Dispatch a new DOM event in page',
    validate: [options.allow('name', 'tab-id', 'xpath'), options.requireAll('name', 'xpath')]
  })
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'List all registered events',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Delete a registered event by its identifier',
    validate: [options.requireAll('event-id')]
  })
  .expect({
    name: 'xpath',
    abbreviation: 'x',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define an XPath query',
    validate: [options.requireAnyOf('dom-dispatch')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a Tab ID where apply an action',
    validate: [value.isTabId, options.requireAnyOf('dom-dispatch')]
  })
  .expect({
    name: 'name',
    abbreviation: 'n',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the name of the event',
    validate: [value.isAnyOf(domEventsSupported), options.requireAnyOf('dom-dispatch')]
  })
  .expect({
    name: 'event-id',
    abbreviation: 'E',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the command identifier of the event',
    validate: [options.requireAnyOf('delete')]
  })
  .expect({
    name: 'event',
    abbreviation: 'e',
    type: commandTypes.ARRAY,
    helpSection: helpSections.DETAILS,
    description: 'Define a type-url-command event tuple',
    repeatable: true,
    validate: [
      array.hasAllItemsAs(
        value.isArray,
        array.hasLength(3),
        array.hasItemAs(0, value.isAnyOf(availableEventValues)),
        array.hasItemAs(1, value.isURL),
        array.hasAllItemsAs(value.isString)
      ),
      options.requireAnyOf('register')
    ]
  })
