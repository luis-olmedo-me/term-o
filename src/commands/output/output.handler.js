import { createHelpView } from '@src/helpers/command.helpers'
import { formatOutput } from '@src/helpers/format.helpers'

export const outputHandler = async command => {
  const P = name => command.props[name]

  if (P`log`) {
    const logs = formatOutput({ values: P`value` })

    command.log(...logs)
  }

  if (P`help`) createHelpView(command)
}
