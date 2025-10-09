import { createHelpView } from '@src/helpers/command.helpers'
import { formatError } from '@src/helpers/format.helpers'

export const handleERROR = async command => {
  const P = name => command.props[name]

  if (P`title`) {
    const errorUpdate = formatError({ title: P`title` })

    command.throw(errorUpdate)
  }

  if (P`help`) createHelpView(command)
}
