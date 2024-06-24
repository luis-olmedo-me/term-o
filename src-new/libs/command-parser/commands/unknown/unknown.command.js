import { commandNames } from '../../sub-services/command/command.constants'
import { Command } from '../../sub-services/command/command.service'

const handleUnknown = command => {
  console.log('Unknown', command)
}

export const createUknown = script => {
  return new Command({
    name: commandNames.UKNOWN,
    command: script
  }).setHandler(handleUnknown)
}
