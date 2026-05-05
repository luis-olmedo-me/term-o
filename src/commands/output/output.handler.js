import { createHelpView } from '@src/helpers/command.helpers'

export const outputHandler = async command => {
  const P = name => command.props[name]

  if (P`log`) {
    command.log(P`value`)
  }

  if (P`help`) createHelpView(command)
}
