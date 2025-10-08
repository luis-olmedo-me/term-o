import CommandBase from '@src/templates/CommandBase'

import { commandNames } from '@src/constants/command.constants'
import { isRegExp } from '../validators'
import { eventsHelpSections, eventsHelpSectionTitles } from './events.constants'

export default new CommandBase({
  name: commandNames.EVENTS,
  helpSectionTitles: eventsHelpSectionTitles
})
  .expect({
    name: 'add',
    type: 'boolean',
    abbreviation: 'a',
    helpSection: eventsHelpSections.CREATION,
    worksWith: ['url', 'command'],
    mustHave: ['url', 'command'],
    description: 'Create a new event'
  })
  .expect({
    name: 'url',
    type: 'string',
    abbreviation: 'u',
    helpSection: eventsHelpSections.CREATION,
    validate: [isRegExp],
    description: 'URL pattern where the event will trigger (regex supported)'
  })
  .expect({
    name: 'command',
    type: 'string',
    abbreviation: 'c',
    helpSection: eventsHelpSections.CREATION,
    description: 'Command line to execute'
  })
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    helpSection: eventsHelpSections.MANAGEMENT,
    worksWith: [],
    description: 'List all events'
  })
  .expect({
    name: 'delete',
    type: 'string',
    abbreviation: 'd',
    helpSection: eventsHelpSections.MANAGEMENT,
    worksWith: [],
    description: 'Delete an event by its id'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    helpSection: eventsHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
