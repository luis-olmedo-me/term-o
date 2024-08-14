import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import { hasItems, hasNoSpaces, onItem } from '../validators'

export default new CommandTemplate({ name: commandNames.SCRIPTS })
  .expect({
    name: 'add',
    type: 'string-array',
    abbreviation: 'a',
    validate: [hasItems(2), onItem(0, hasNoSpaces)],
    worksWith: [],
    description: 'Add a new script. Format: ["script-name" "javascript-code"]'
  })
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    worksWith: [],
    description: 'List all defined scripts.'
  })
  .expect({
    name: 'delete',
    type: 'string',
    abbreviation: 'd',
    worksWith: [],
    description: 'Delete an script by its name.'
  })
  .expect({
    name: 'run',
    type: 'string',
    abbreviation: 'r',
    worksWith: [],
    description: 'Run an script by its name.'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
