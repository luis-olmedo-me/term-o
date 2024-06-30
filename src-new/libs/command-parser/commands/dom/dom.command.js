import { isRegExp } from '@src/helpers/utils.helpers'
import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

const validateRegExp = value => {
  if (!isRegExp(value)) throw `${value} is not a valid regular expression.`
}

export const createDOM = script => {
  return new Command({
    name: commandNames.DOM,
    command: script
  })
    .expect({
      name: 'get',
      type: 'boolean',
      abbreviation: 'g',
      worksWith: ['attr', 'tag', 'group']
    })
    .expect({
      name: 'group',
      type: 'boolean',
      abbreviation: 'G'
    })
    .expect({
      name: 'attr',
      type: 'string',
      abbreviation: 'a',
      validate: validateRegExp
    })
    .expect({
      name: 'tag',
      type: 'string',
      abbreviation: 't',
      validate: validateRegExp
    })
}
