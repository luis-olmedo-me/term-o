import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

const handleERROR = command => {
  throw `${command.props.title}`
}

export const createERROR = () => {
  return new Command({ name: commandNames.ERROR })
    .expect({
      name: 'title',
      type: 'string',
      abbreviation: 't',
      worksWith: []
    })
    .addEventListener('execute', handleERROR)
}
