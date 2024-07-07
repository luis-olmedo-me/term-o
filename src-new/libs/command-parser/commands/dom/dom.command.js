import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isInRange, isRegExp, isXpath } from '../validators'

export const createDOM = () => {
  return new Command({ name: commandNames.DOM })
    .expect({
      name: 'search-xpath',
      type: 'string',
      abbreviation: 'X',
      worksWith: [],
      validate: [isXpath]
    })
    .expect({
      name: 'search',
      type: 'boolean',
      abbreviation: 's',
      worksWith: ['attr', 'tag', 'group', 'text', 'xpath']
    })
    .expect({
      name: 'xpath',
      type: 'boolean',
      abbreviation: 'x'
    })
    .expect({
      name: 'group',
      type: 'boolean',
      abbreviation: 'g'
    })
    .expect({
      name: 'attr',
      type: 'string-array',
      abbreviation: 'a',
      validate: [isRegExp, isInRange(0, 2)]
    })
    .expect({
      name: 'tag',
      type: 'string',
      abbreviation: 't',
      validate: [isRegExp]
    })
    .expect({
      name: 'text',
      type: 'string',
      abbreviation: 'T',
      validate: [isRegExp]
    })
}
