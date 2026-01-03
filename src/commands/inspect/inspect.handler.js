import { createHelpView } from '@src/helpers/command.helpers'

export const inspectHandler = async command => {
  const P = name => command.props[name]

  if (P`path`) {
    command.update(P`path`)
  }

  if (P`help`) createHelpView(command)
}
