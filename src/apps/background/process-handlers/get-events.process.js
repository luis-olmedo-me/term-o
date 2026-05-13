import { storageKeys } from '@src/constants/storage.constants'

export default async (resolve, _reject, data, { storage, sender }) => {
  const events = storage.get(storageKeys.EVENTS)
  const tab = sender.tab

  const pendingEvents = events.filter(event => {
    const matchUrl = new RegExp(event.url).test(tab.url)
    const matchType = event.type === data.type

    return matchUrl && matchType
  })

  resolve(pendingEvents)
}
