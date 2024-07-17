import { createUUIDv4, getQuotedString } from '@src/helpers/utils.helpers'
import { getColor as C } from '@src/theme/theme.helpers'
import { displayHelp } from '../command-handlers.helpers'

export const handleEVENTS = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const { events = [] } = await chrome.storage.local.get('events')

    events.forEach(({ url, line, id }) => {
      const quotedId = getQuotedString(id)
      const quotedURL = getQuotedString(url)
      const quotedLine = getQuotedString(line)

      command.update(`${C`purple`}${quotedId} ${C`blue`}${quotedURL} ${C`yellow`}${quotedLine}`)
    })
  }

  if (P`add`) {
    const { events = [] } = await chrome.storage.local.get('events')
    const id = createUUIDv4()

    const newEvents = events.concat({ url: P`url`, line: P`command`, id })

    await chrome.storage.local.set({ events: newEvents })

    const quotedId = getQuotedString(id)
    const quotedURL = getQuotedString(P`url`)
    const quotedLine = getQuotedString(P`command`)

    command.update(`${C`purple`}${quotedId} ${C`blue`}${quotedURL} ${C`yellow`}${quotedLine}`)
  }

  if (P`delete`) {
    const id = P`delete`

    const { events = [] } = await chrome.storage.local.get('events')
    const existingEvent = events.find(event => event.id === id)

    if (!existingEvent) {
      return command.throw(`The event ${C`brightRed`}"${id}"${C`red`} does not exist.`)
    }

    const newEvents = events.filter(alias => alias.id !== id)

    await chrome.storage.local.set({ events: newEvents })

    const quotedId = getQuotedString(id)
    const quotedURL = getQuotedString(existingEvent.url)
    const quotedLine = getQuotedString(existingEvent.line)

    command.update(`${C`purple`}${quotedId} ${C`blue`}${quotedURL} ${C`yellow`}${quotedLine}`)
  }

  if (P`help`) displayHelp(command)
}
