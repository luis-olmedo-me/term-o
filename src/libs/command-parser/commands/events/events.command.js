import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createEVENTS = () => {
  return new Command({ name: commandNames.EVENTS })
    .expect({
      name: 'add',
      type: 'boolean',
      abbreviation: 'a',
      worksWith: [],
      mustHave: ['url', 'command'],
      description: 'Add a new event. You can specify the event details with props.'
    })
    .expect({
      name: 'url',
      type: 'string',
      abbreviation: 'u',
      description: 'Define the URL where the event will be executed.'
    })
    .expect({
      name: 'command',
      type: 'string',
      abbreviation: 'd',
      worksWith: [],
      description: 'Define what line of command(s) will be executed.'
    })
    .expect({
      name: 'list',
      type: 'boolean',
      abbreviation: 'l',
      worksWith: [],
      description: 'List all defined events.'
    })
    .expect({
      name: 'delete',
      type: 'string',
      abbreviation: 'd',
      worksWith: [],
      description: 'Delete an event by its Id ([string]).'
    })
    .expect({
      name: 'help',
      type: 'boolean',
      abbreviation: 'h',
      description: 'Display help about the options available for this command.',
      worksWith: []
    })
}
