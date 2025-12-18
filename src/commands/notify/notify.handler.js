import storage from '@src/libs/storage'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatNotification } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'
import { createNotification } from '@src/processes'

export const notifyHandler = async command => {
  const P = name => command.props[name]
  const tabId = P`tab-id` ? cleanTabId(P`tab-id`) : storage.get(storageKeys.TAB).id

  if (P`create`) {
    const config = storage.get(storageKeys.CONFIG)
    const title = P`title`
    const message = P`message`

    const notification = await createNotification(tabId, {
      title,
      message,
      theme: config.theme
    })

    const update = formatNotification(notification)

    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
