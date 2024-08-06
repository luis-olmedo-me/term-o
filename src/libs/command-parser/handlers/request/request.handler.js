import { getUnquotedString } from '@src/helpers/utils.helpers'
import { displayHelp, formatJSONAsString } from '../handlers.helpers'

export const handleREQUEST = async command => {
  const P = name => command.props[name]

  if (P`fetch`) {
    try {
      command.update('API request in progress.')
      const response = await fetch(P`url`)

      if (!response.ok) return command.throw(`API failed with status "${response.status}".`)

      const jsonResponse = await response[P`read-as`]()

      const update = formatJSONAsString({
        json: P`read-as` === 'text' ? getUnquotedString(jsonResponse) : jsonResponse
      })

      command.reset()
      command.update(update)
    } catch (error) {
      command.throw(`Error while reading response as "${P`read-as`}".`)
    }
  }

  if (P`help`) displayHelp(command)
}
