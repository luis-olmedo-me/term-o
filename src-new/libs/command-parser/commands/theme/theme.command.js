import { colorScheme } from '@src/theme/theme.helpers'
import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isJSONScheme } from '../validators'

export const createALIAS = () => {
  return new Command({ name: commandNames.ALIAS })
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
