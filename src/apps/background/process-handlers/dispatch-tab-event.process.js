import { origins } from '@src/constants/command.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { quotify } from '@src/helpers/string.helpers'

export default async (resolve, _reject, data, { storage, sender }) => {
  const queue = storage.get(storageKeys.QUEUE)
  const tab = sender.tab
  const tabId = sender.tab.id

  const { event, params } = data

  const eventData = {
    ...event,
    params: [quotify(event.id), quotify(event.type), quotify(`T${tabId}`), ...params]
  }

  queue.scheduleAddition(event.line, origins.AUTO, tab, eventData)

  resolve(null)
}
