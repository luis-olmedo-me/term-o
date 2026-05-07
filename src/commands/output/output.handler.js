import { createHelpView } from '@src/helpers/command.helpers'
import { formatOutput } from '@src/helpers/format.helpers'

export const outputHandler = async command => {
  const P = name => command.props[name]

  if (P`log`) {
    const log = formatOutput({ values: P`value` })

    command.log(log)
  }

  if (P`help`) createHelpView(command)
}
