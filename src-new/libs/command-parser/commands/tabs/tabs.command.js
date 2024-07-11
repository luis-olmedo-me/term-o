import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isRegExp, isURL } from '../validators'

export const createTABS = () => {
  return new Command({ name: commandNames.TABS })
    .expect({
      name: 'list',
      type: 'boolean',
      abbreviation: 'l',
      worksWith: ['incognito', 'muted', 'unmuted', 'title', 'url', 'window-id']
    })
    .expect({
      name: 'incognito',
      type: 'boolean',
      abbreviation: 'i'
    })
    .expect({
      name: 'title',
      type: 'string',
      abbreviation: 't',
      validate: [isRegExp]
    })
    .expect({
      name: 'url',
      type: 'string',
      abbreviation: 'u',
      validate: [isRegExp]
    })
    .expect({
      name: 'muted',
      type: 'boolean',
      abbreviation: 'm'
    })
    .expect({
      name: 'unmuted',
      type: 'boolean',
      abbreviation: 'M'
    })
    .expect({
      name: 'window-id',
      type: 'string',
      abbreviation: 'w'
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
    .expect({
      name: 'pointing',
      type: 'boolean',
      abbreviation: 'P',
      worksWith: []
    })
}
