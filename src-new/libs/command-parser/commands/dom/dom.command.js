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
    .expect({ name: 'attr', type: 'string', abbreviation: 'a', validate: validateRegExp, requires: ["get"] })
    .expect({ name: 'tag', type: 'string', abbreviation: 't', validate: validateRegExp, requires: ["get"] })
    .expect({ name: 'get', type: 'boolean', abbreviation: 'g' })
    .expect({ name: 'group', type: 'boolean', abbreviation: 'G', requires: ["get"] })
}
