import { storageKeys } from '@src/constants/storage.constants'

export default async (resolve, _reject, _data, { storage, sender }) => {
  const events = storage.get(storageKeys.EVENTS)
  const tab = sender.tab
  const pendingEvents = events.filter(event => new RegExp(event.url).test(tab.url))

  resolve(pendingEvents)
}
