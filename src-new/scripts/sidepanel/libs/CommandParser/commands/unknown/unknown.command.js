import { Command } from '../Command.service'

const handleUnknown = props => {
  console.log('Unknown', props)
}

export const createUknown = command => {
  return new Command(command).setHandler(handleUnknown)
}
