import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { eventsSupported } from '@src/constants/options.constants'
import { isAnyOf, isRegExp, isXpath } from '@src/helpers/validation-command.helpers'
import { eventsHelpSections, eventsHelpSectionTitles } from './events.constants'
import { eventsHandler } from './events.handler'

export default new CommandBase({
  name: commandNames.EVENTS,
  helpSectionTitles: eventsHelpSectionTitles,
  handler: eventsHandler
})
  .expect({
    name: 'trigger',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: eventsHelpSections.CREATION,
    description: 'Trigger a new event in page',
    worksWith: ['xpath', 'event'],
    mustHave: ['event']
  })
  .expect({
    name: 'xpath',
    abbreviation: 'x',
    type: 'string',
    helpSection: eventsHelpSections.CREATION,
    description: 'XPath selector for the target element',
    worksWith: ['trigger'],
    validate: [isXpath]
  })
  .expect({
    name: 'event',
    abbreviation: 'e',
    type: 'string',
    helpSection: eventsHelpSections.CREATION,
    description: 'Type of event to trigger',
    worksWith: ['trigger'],
    validate: [isAnyOf(eventsSupported)]
  })
  .expect({
    name: 'register',
    abbreviation: 'r',
    type: commandTypes.BOOLEAN,
    helpSection: eventsHelpSections.CREATION,
    description: 'Register a new command for future execution',
    worksWith: ['url', 'command'],
    mustHave: ['url', 'command']
  })
  .expect({
    name: 'url',
    abbreviation: 'u',
    type: 'string',
    helpSection: eventsHelpSections.CREATION,
    description: 'URL pattern where the event will trigger (regex)',
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
    description: 'List all registered events',
    worksWith: []
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: 'string',
    helpSection: eventsHelpSections.MANAGEMENT,
    description: 'Delete a registered event by its id',
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
