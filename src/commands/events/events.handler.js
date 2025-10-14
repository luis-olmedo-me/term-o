import storage from '@src/libs/storage'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatEvent } from '@src/helpers/format.helpers'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

export const eventsHandler = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const events = storage.get(storageKeys.EVENTS)
    const updates = events.map(formatEvent)

    command.update(...updates)
  }

  if (P`add`) {
    const id = createUUIDv4()
    const events = storage.get(storageKeys.EVENTS)
    const newEvent = { url: P`url`, line: P`command`, id }

    const newEvents = events.concat(newEvent)
    const update = formatEvent(newEvent)

    storage.set(storageKeys.EVENTS, newEvents)
    command.update(update)
  }

  if (P`delete`) {
    const id = P`delete`

    const events = storage.get(storageKeys.EVENTS)
    const existingEvent = events.find(event => event.id === id)

    if (!existingEvent) {
      return command.throw(`The event "${id}" does not exist.`)
    }

    const newEvents = events.filter(alias => alias.id !== id)
    const update = formatEvent(existingEvent)

    storage.set(storageKeys.EVENTS, newEvents)
    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
