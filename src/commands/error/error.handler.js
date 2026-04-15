import { createHelpView } from '@src/helpers/command.helpers'

export const errorHandler = async command => {
  const P = name => command.props[name]

  if (P`create`) {
    command.throw(P`title`)
  }

  if (P`help`) createHelpView(command)
}
