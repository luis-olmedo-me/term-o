import { displayHelp, formatResponse } from '../handlers.helpers'

export const handleREQUEST = async command => {
  const P = name => command.props[name]

  if (P`fetch`) {
    try {
      command.update('API request in progress.')
      const headers = new Headers()

      P`headers`.forEach(header => {
        const [name, value] = header.split(':').map(part => part?.trim())

        headers.append(name, value)
      })

      const response = await fetch(P`url`, { headers, method: P`method` })
      const responseBody = await response[P`read-as`]()

      const update = formatResponse({ response, responseBody, method: P`method` })

      command.reset()
      command.update(update)
    } catch (error) {
      command.throw(`Error while reading response as "${P`read-as`}".`)
    }
  }

  if (P`help`) displayHelp(command)
}
