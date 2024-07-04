import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { hasItems, hasNoSpaces, onItem } from '../helpers'

export const createALIAS = () => {
  return new Command({ name: commandNames.ALIAS })
    .expect({
      name: 'add',
      type: 'string-array',
      abbreviation: 'a',
      validate: [hasItems(2), onItem(1, hasNoSpaces)],
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
