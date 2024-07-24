import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import { isJSONScheme } from '../validators'
import { colorScheme } from './theme.constants'

export default new CommandTemplate({ name: commandNames.THEME })
  .expect({
    name: 'import',
    type: 'string',
    abbreviation: 'i',
    validate: [isJSONScheme(colorScheme)],
    worksWith: [],
    description: 'Import a color scheme in JSON format.'
  })
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    worksWith: [],
    description: 'List available themes.'
  })
  .expect({
    name: 'delete',
    type: 'string',
    abbreviation: 'd',
    worksWith: [],
    description: 'Delete a theme by its name.'
  })
  .expect({
    name: 'apply',
    type: 'string',
    abbreviation: 'a',
    worksWith: [],
    description: 'Apply a theme by its name.'
  })
  .expect({
    name: 'current',
    type: 'boolean',
    abbreviation: 'C',
    worksWith: [],
    description: 'Show the currently applied theme.'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
