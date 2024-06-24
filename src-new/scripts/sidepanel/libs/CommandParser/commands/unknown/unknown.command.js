import { Command } from '../Command.service'

const handleUnknown = command => {
  console.log('Unknown', command)
}

export const createUknown = script => {
  return new Command({ name: 'uknown', command: script }).setHandler(handleUnknown)
}
