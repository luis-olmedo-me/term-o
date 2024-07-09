import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isInRange, isRegExp, isXpath } from '../validators'

export const createSTYLE = () => {
  return new Command({ name: commandNames.STYLE })
    .expect({
      name: 'on',
      type: 'string',
      abbreviation: 'o',
      worksWith: ['property', 'selector'],
      validate: [isXpath]
    })
    .expect({
      name: 'property',
      type: 'string-array',
      abbreviation: 'p',
      validate: [isRegExp, isInRange(0, 2)]
    })
    .expect({
      name: 'selector',
      type: 'string',
      abbreviation: 's',
      validate: [isRegExp]
    })
    .expect({
      name: 'apply',
      type: 'string',
      abbreviation: 'a',
      worksWith: []
    })
}
