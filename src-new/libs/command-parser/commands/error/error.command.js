import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

const handleERROR = command => {
  throw `${command.props.title}`
}

export const createERROR = script => {
  return new Command({
    name: commandNames.ERROR,
    command: script
  })
    .expect({ name: 'title', type: 'string' })
    .addEventListener('execute', handleERROR)
}
