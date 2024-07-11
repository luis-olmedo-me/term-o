import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isInRange, isRegExp, isXpath } from '../validators'

export const createDOM = () => {
  return new Command({ name: commandNames.DOM })
    .expect({
      name: 'search-xpath',
      type: 'string',
      abbreviation: 'X',
      worksWith: ['click', 'tab-id'],
      validate: [isXpath]
    })
    .expect({
      name: 'click',
      type: 'boolean',
      abbreviation: 'c'
    })
    .expect({
      name: 'search',
      type: 'boolean',
      abbreviation: 's',
      worksWith: ['attr', 'style', 'tag', 'group', 'text', 'content', 'xpath', 'tab-id']
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
      name: 'style',
      type: 'string-array',
      abbreviation: 'S',
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
    .expect({
      name: 'content',
      type: 'boolean',
      abbreviation: 'C',
      validate: [isRegExp]
    })
    .expect({
      name: 'tab-id',
      type: 'string',
      abbreviation: 'i'
    })
}
