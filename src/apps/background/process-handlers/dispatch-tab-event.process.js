import { origins } from '@src/constants/command.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { quotify } from '@src/helpers/string.helpers'

export default async (resolve, _reject, data, { storage, sender }) => {
  const queue = storage.get(storageKeys.QUEUE)
  const events = storage.get(storageKeys.EVENTS)
  const tab = sender.tab

  const pendingEvents = events.filter(event => {
    const matchUrl = new RegExp(event.url).test(tab.url)
    const matchType = event.type === data.type

    return matchUrl && matchType
  })

  for (const event of pendingEvents) {
    const tabId = sender.tab.id
    const eventData = {
      ...event,
      params: [quotify(event.id), quotify(event.type), quotify(`T${tabId}`)]
    }

    queue.add(event.line, origins.AUTO, tab, eventData)
  }

  resolve(null)
}
