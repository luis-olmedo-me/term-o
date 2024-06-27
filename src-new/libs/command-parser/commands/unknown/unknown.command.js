import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

const handleUKNOWN = command => {
  throw `${command.props.title}`
}

export const createUKNOWN = script => {
  return new Command({
    name: commandNames.UKNOWN,
    command: script
  })
    .expect({ name: 'title', type: 'string', defaultValue: 'Uknown command.' })
    .addEventListener('execute', handleUKNOWN)
}
