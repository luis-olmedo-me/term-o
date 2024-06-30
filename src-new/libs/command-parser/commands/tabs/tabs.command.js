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
      worksWith: []
    })
    .expect({
      name: 'switch',
      type: 'string',
      abbreviation: 's',
      worksWith: []
    })
}
