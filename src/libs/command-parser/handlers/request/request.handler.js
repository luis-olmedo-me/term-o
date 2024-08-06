import { displayHelp } from '../handlers.helpers'

export const handleREQUEST = async command => {
  const P = name => command.props[name]

  command.update('testing..')

  if (P`help`) displayHelp(command)
}
