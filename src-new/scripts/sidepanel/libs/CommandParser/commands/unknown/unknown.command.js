import { Command } from '../Command.service'

const handleUnknown = command => {
  console.log('Unknown', command)
}

export const createUknown = script => {
  return new Command('uknown', script).setHandler(handleUnknown)
}
