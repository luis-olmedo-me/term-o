import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

const handleERROR = command => {
  const P = name => command.props[name]

  if (P`title`) {
    command.throw(P`title`)
  }
}

export const createERROR = () => {
  return new Command({ name: commandNames.ERROR })
    .expect({
      name: 'title',
      type: 'string',
      abbreviation: 't',
      description: 'Throw and error.',
      worksWith: []
    })
    .addEventListener('execute', handleERROR)
}
