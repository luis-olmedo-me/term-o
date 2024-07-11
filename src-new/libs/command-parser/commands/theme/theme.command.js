import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isJSONScheme } from '../validators'
import { colorScheme } from './theme.constants'

export const createTHEME = () => {
  return new Command({ name: commandNames.THEME })
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
}
