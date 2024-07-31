import { displayHelp } from '../handlers.helpers'

export const handleHistory = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    command.update('show history')
  }

  if (P`help`) displayHelp(command)
}
