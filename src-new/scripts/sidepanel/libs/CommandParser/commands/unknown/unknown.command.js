import { Command } from '../Command.service'

const handleUnknown = props => {
  console.log('Unknown', props)
}

export const createUknown = command => {
  return new Command('uknown', command).setHandler(handleUnknown)
}
