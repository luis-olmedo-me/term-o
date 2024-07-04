import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isRegExp } from '../helpers'

const isInRange = (min, max) => {
  return value => {
    const isValid = value.length >= min && value.length <= max

    if (!isValid)
      throw `Expected between ${min} and ${max} value(s). Instead, it received ${value.length}.`
  }
}

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
}
