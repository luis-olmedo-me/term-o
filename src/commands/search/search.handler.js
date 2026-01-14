import { createHelpView } from '@src/helpers/command.helpers'

export const inspectHandler = async command => {
  const P = name => command.props[name]

  if (P`query`) {
    const query = P`query`
    const input = P`input`

    if (input.contains(query)) command.update(input)
  }

  if (P`help`) createHelpView(command)
}
