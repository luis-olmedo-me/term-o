import processManager from '@src/libs/process-manager'

import { getTab } from '@src/browser-api/tabs.api'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatEvent, formatRegisteredEvent } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

export const eventsHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  let tabId = storage.get(storageKeys.TAB).id

  if (P`tab-id`) {
    command.update(['"Connecting to the tab."'])
    const validTab = await getTab({ tabId: cleanTabId(P`tab-id`) })

    tabId = validTab.id
  }

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
    const id = P`command-id`

    const events = storage.get(storageKeys.EVENTS)
    const existingEvent = events.find(event => event.id === id)

    if (!existingEvent) throw `The event "${id}" does not exist.`

    const newEvents = events.filter(alias => alias.id !== id)
    const update = formatRegisteredEvent(existingEvent)

    storage.set(storageKeys.EVENTS, newEvents)
    command.update(update)
  }

  if (P`dom-dispatch`) {
    const config = storage.get(storageKeys.CONFIG)

    const event = P`name`
    const xpath = P`xpath`

    command.update(['"Triggering DOM event."'])
    await processManager.triggerEvent(tabId, { xpath, event, theme: config.theme })
    const update = formatEvent({ event, xpath })

    command.reset()
    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
