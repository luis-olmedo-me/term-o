import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'

export default new CommandTemplate({ name: commandNames.ERROR })
  .expect({
    name: 'title',
    type: 'string',
    abbreviation: 't',
    description: 'Throw and error.',
    worksWith: []
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
