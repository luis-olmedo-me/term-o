import { createHelpView } from '@src/helpers/command.helpers'
import { formatResponse } from '../handlers.helpers'

export const handleREQUEST = async command => {
  const P = name => command.props[name]

  if (P`fetch`) {
    command.update('API request in progress.')
    const headers = new Headers()

    P`headers`.forEach(header => {
      const [name, value] = header.split(':').map(part => part?.trim())

      headers.append(name, value)
    })

    try {
      const response = await fetch(P`url`, {
        headers,
        method: P`method`,
        ...(P`payload` ? { body: P`payload` } : {})
      })
      const responseBody = await response[P`read-as`]()

      const update = formatResponse({ response, responseBody, method: P`method` })

      command.reset()
      command.update(update)
    } catch (error) {
      command.throw(`Error while reading response as "${P`read-as`}".`)
    }
  }

  if (P`help`) createHelpView(command)
}
