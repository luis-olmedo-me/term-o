import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'

export default new CommandTemplate({ name: commandNames.HISTORY })
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    worksWith: [],
    description: 'Show a list of pages open in the past.'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
