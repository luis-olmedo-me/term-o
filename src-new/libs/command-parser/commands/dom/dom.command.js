import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isRegExp } from '../helpers'

export const createDOM = () => {
  return new Command({ name: commandNames.DOM })
    .expect({
      name: 'search',
      type: 'boolean',
      abbreviation: 's',
      worksWith: ['attr', 'tag', 'group']
    })
    .expect({
      name: 'group',
      type: 'boolean',
      abbreviation: 'g'
    })
    .expect({
      name: 'attr',
      type: 'string',
      abbreviation: 'a',
      validate: [isRegExp]
    })
    .expect({
      name: 'tag',
      type: 'string',
      abbreviation: 't',
      validate: [isRegExp]
    })
}
