import { createHelpView } from '@src/helpers/command.helpers'
import { formatStringSearch } from '@src/helpers/format.helpers'

export const searchHandler = async command => {
  const P = name => command.props[name]

  if (P`query`) {
    const query = P`query`
    const input = P`input`
    const queryRegex = new RegExp(query, 'gi')

    if (queryRegex.test(input)) {
      const update = formatStringSearch({ query: queryRegex, input })

      command.update(update)
    }
  }

  if (P`help`) createHelpView(command)
}
