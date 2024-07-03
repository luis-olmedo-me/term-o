import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isURL } from '../helpers'

export const createTABS = () => {
  return new Command({ name: commandNames.TABS })
    .expect({
      name: 'list',
      type: 'boolean',
      abbreviation: 'l',
      worksWith: ['incognito']
    })
    .expect({
      name: 'incognito',
      type: 'boolean',
      abbreviation: 'i'
    })
    .expect({
      name: 'switch',
      type: 'string',
      abbreviation: 's',
      worksWith: []
    })
    .expect({
      name: 'points',
      type: 'string',
      abbreviation: 'p',
      worksWith: []
    })
    .expect({
      name: 'reload',
      type: 'string',
      abbreviation: 'r',
      worksWith: []
    })
    .expect({
      name: 'close',
      type: 'string',
      abbreviation: 'c',
      worksWith: []
    })
    .expect({
      name: 'open',
      type: 'string',
      abbreviation: 'o',
      validate: [isURL],
      worksWith: []
    })
    .expect({
      name: 'current',
      type: 'boolean',
      abbreviation: 'C',
      worksWith: []
    })
}
