import processManager from '@src/libs/process-manager'

import { getTab } from '@src/browser-api/tabs.api'
import { storageKeys } from '@src/constants/storage.constants'
import { customColorThemeKeys } from '@src/constants/themes.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatNotification } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'

export const notifyHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  let tabId = storage.get(storageKeys.TAB).id

  if (P`tab-id`) {
    command.update(['"Connecting to the tab."'])
    const validTab = await getTab({ tabId: cleanTabId(P`tab-id`) })

    tabId = validTab.id
  }

  if (P`create`) {
    const config = storage.get(storageKeys.CONFIG)
    const title = P`title`
    const message = P`message`

    const notification = await processManager.createNotification(tabId, {
      title,
      message,
      theme: config.theme,
      color: customColorThemeKeys.ACCENT
    })

    const update = formatNotification(notification)

    command.reset()
    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
