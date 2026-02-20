import { createHelpView } from '@src/helpers/command.helpers'

export const inputHandler = async command => {
  const P = name => command.props[name]

  if (P`request`) {
    command.update([P`title`])
  }

  if (P`help`) createHelpView(command)
}
