import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatRegisteredEvent } from '@src/helpers/format.helpers'
import { createShortID } from '@src/helpers/utils.helpers'

export const eventsHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  if (P`list`) {
    const events = storage.get(storageKeys.EVENTS)
    const updates = events.map(formatRegisteredEvent)

    command.update(...updates)
  }

  if (P`register`) {
    P`event`.forEach(([type, url, line]) => {
      const id = createShortID()
      const newEvent = { url, line, id, type }
      const events = storage.get(storageKeys.EVENTS)

      const newEvents = events.concat(newEvent)
      const update = formatRegisteredEvent(newEvent)

      storage.set(storageKeys.EVENTS, newEvents)
      command.update(update)
    })
  }

  if (P`delete`) {
    const id = P`event-id`

    const events = storage.get(storageKeys.EVENTS)
    const existingEvent = events.find(event => event.id === id)

    if (!existingEvent) throw `The event "${id}" does not exist.`

    const newEvents = events.filter(alias => alias.id !== id)
    const update = formatRegisteredEvent(existingEvent)

    storage.set(storageKeys.EVENTS, newEvents)
    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
