import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'

export default new CommandTemplate({ name: commandNames.SCRIPTS })
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    worksWith: [],
    description: 'List all defined scripts.'
  })
  .expect({
    name: 'upload',
    type: 'boolean',
    abbreviation: 'u',
    worksWith: [],
    description: 'Upload a file to add as script.'
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
