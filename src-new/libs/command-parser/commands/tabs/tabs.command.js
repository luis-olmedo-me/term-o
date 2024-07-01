import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createTABS = script => {
  return new Command({
    name: commandNames.TABS,
    command: script
  })
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
}
