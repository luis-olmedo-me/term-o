import { formatError } from '../handlers.helpers'

export const handleERROR = async command => {
  const P = name => command.props[name]

  if (P`title`) {
    const errorUpdate = formatError({ title: P`title` })

    command.throw(errorUpdate)
  }
}
