import { createHelpView } from '@src/helpers/command.helpers'

export const searchHandler = async command => {
  const P = name => command.props[name]

  if (P`query`) {
    const query = P`query`
    const input = P`input`
    const queryRegex = new RegExp(query)
    const params = command.params.join(' ')

    if (queryRegex.test(input)) command.update(params)
  }

  if (P`help`) createHelpView(command)
}
