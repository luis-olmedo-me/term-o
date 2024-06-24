import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

const handleUnknown = command => {
  console.log('Unknown', command)
}

export const createUknown = script => {
  return new Command({
    name: commandNames.UKNOWN,
    command: script
  }).setHandler(handleUnknown)
}
