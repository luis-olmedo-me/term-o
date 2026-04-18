import { origins } from '@src/constants/command.constants'
import { storageKeys } from '@src/constants/storage.constants'

export default async (resolve, _reject, data, storage) => {
  const queue = storage.get(storageKeys.COMMAND_QUEUE)
  const events = storage.get(storageKeys.EVENTS)
  const tab = storage.get(storageKeys.TAB)

  const pendingEvents = events.filter(event => {
    const matchUrl = new RegExp(event.url).test(tab.url)
    const matchType = event.type === data.type

    return matchUrl && matchType
  })

  pendingEvents.forEach(event => queue.add(event.line, origins.AUTO, tab, event.type))

  resolve(null)
}
