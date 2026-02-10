import processManager from '@src/libs/process-manager'

import { domEventsSupported } from '@src/constants/options.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatEvent, formatRegisteredEvent } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

export const eventsHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  if (P`list`) {
    const events = storage.get(storageKeys.EVENTS)
    const updates = events.map(formatRegisteredEvent)

    command.update(...updates)
  }

  if (P`register`) {
    const id = createUUIDv4()
    const events = storage.get(storageKeys.EVENTS)
    const newEvent = { url: P`url`, line: P`command`, id }

    const newEvents = events.concat(newEvent)
    const update = formatRegisteredEvent(newEvent)

    storage.set(storageKeys.EVENTS, newEvents)
    command.update(update)
  }

  if (P`delete`) {
    const id = P`delete`

    const events = storage.get(storageKeys.EVENTS)
    const existingEvent = events.find(event => event.id === id)

    if (!existingEvent) throw `The event "${id}" does not exist.`

    const newEvents = events.filter(alias => alias.id !== id)
    const update = formatRegisteredEvent(existingEvent)

    storage.set(storageKeys.EVENTS, newEvents)
    command.update(update)
  }

  if (P`trigger`) {
    const config = storage.get(storageKeys.CONFIG)

    const event = P`trigger`
    const xpath = P`xpath`
    const tabId = P`tab-id` ? cleanTabId(P`tab-id`) : storage.get(storageKeys.TAB).id

    const isDomEvent = domEventsSupported.includes(event)

    if (isDomEvent && !xpath) throw `${event} must be triggered on an existing DOM element.`

    await processManager.triggerEvent(tabId, { xpath, event, theme: config.theme })
    const update = formatEvent({ event, xpath })

    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
