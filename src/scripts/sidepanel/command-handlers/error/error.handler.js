import { formatError } from '../command-handlers.helpers'

export const handleERROR = async command => {
  const P = name => command.props[name]

  if (P`title`) {
    const errorUpdate = formatError({ message: P`title` })

    command.throw(errorUpdate)
  }
}
