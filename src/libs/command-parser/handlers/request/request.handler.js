import { displayHelp, formatJSONAsString } from '../handlers.helpers'

export const handleREQUEST = async command => {
  const P = name => command.props[name]

  if (P`fetch`) {
    try {
      const jsonResponse = await fetch(P`url`).then(response => response.json())

      const update = formatJSONAsString({ json: jsonResponse })
      command.update(update)
    } catch (error) {
      command.throw('Error while calling API.')
    }
  }

  if (P`help`) displayHelp(command)
}
