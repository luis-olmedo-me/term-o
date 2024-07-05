import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isJSONScheme } from '../validators'
import { colorScheme } from './theme.constants'

export const createTHEME = () => {
  return new Command({ name: commandNames.THEME })
    .expect({
      name: 'add',
      type: 'string',
      abbreviation: 'a',
      validate: [isJSONScheme(colorScheme)],
      worksWith: []
    })
    .expect({
      name: 'list',
      type: 'boolean',
      abbreviation: 'l',
      worksWith: []
    })
    .expect({
      name: 'delete',
      type: 'string',
      abbreviation: 'd',
      worksWith: []
    })
}
