import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isInlineStyles, isInRange, isRegExp, isXpath } from '../validators'

export const createSTYLE = () => {
  return new Command({ name: commandNames.STYLE })
    .expect({
      name: 'list',
      type: 'boolean',
      abbreviation: 'l',
      worksWith: ['on', 'property', 'selector'],
      mustHave: ['on']
    })
    .expect({
      name: 'apply',
      type: 'string',
      abbreviation: 'a',
      validate: [isInlineStyles],
      worksWith: ['on'],
      mustHave: ['on']
    })
    .expect({
      name: 'on',
      type: 'string',
      abbreviation: 'o',
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
}
