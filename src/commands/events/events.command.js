import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { isRegExp } from '@src/helpers/validation-command.helpers'
import { eventsHelpSections, eventsHelpSectionTitles } from './events.constants'
import { eventsHandler } from './events.handler'

export default new CommandBase({
  name: commandNames.EVENTS,
  helpSectionTitles: eventsHelpSectionTitles,
  handler: eventsHandler
})
  .expect({
    name: 'add',
    abbreviation: 'a',
    type: commandTypes.BOOLEAN,
    helpSection: eventsHelpSections.CREATION,
    description: 'Create a new event',
    worksWith: ['url', 'command'],
    mustHave: ['url', 'command']
  })
  .expect({
    name: 'url',
    abbreviation: 'u',
    type: 'string',
    helpSection: eventsHelpSections.CREATION,
    description: 'URL pattern where the event will trigger (regex supported)',
    validate: [isRegExp]
  })
  .expect({
    name: 'command',
    abbreviation: 'c',
    type: 'string',
    helpSection: eventsHelpSections.CREATION,
    description: 'Command line to execute'
  })
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: eventsHelpSections.MANAGEMENT,
    description: 'List all events',
    worksWith: []
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: 'string',
    helpSection: eventsHelpSections.MANAGEMENT,
    description: 'Delete an event by its id',
    worksWith: []
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: eventsHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
