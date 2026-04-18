import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { availableEventValues } from '@src/constants/events.constants'
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
