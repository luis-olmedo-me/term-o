import { commandNames } from '../command.constants'
import { Command } from '../command.service'

const handleUnknown = command => {
  console.log('Unknown', command)
}

export const createUknown = script => {
  return new Command({
    name: commandNames.UKNOWN,
    command: script
  }).setHandler(handleUnknown)
}
