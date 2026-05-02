import {
  closeTab,
  createTab,
  getCurrentTab,
  getTab,
  getTabsSearch,
  reloadTab,
  updateTab
} from '@src/browser-api/tabs.api'
import { getWindow, updateWindow } from '@src/browser-api/windows.api'
import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatTab } from '@src/helpers/format.helpers'
import { cleanTabId } from '@src/helpers/tabs.helpers'

export const tabsHandler = async command => {
  const storage = command.get('storage')
  const P = name => command.props[name]

  let tabId = storage.get(storageKeys.TAB).id

  if (P`tab-id`) {
    command.log(['"Connecting to the tab."'])
    const validTab = await getTab({ tabId: cleanTabId(P`tab-id`) })

    tabId = validTab.id
  }

  if (P`reload`) {
    if (P`wait`) command.log(['"Please wait while the page is loading."'])
    const tab = await reloadTab({ tabId, wait: P`wait` })
    const log = formatTab(tab)

    command.clearLogs()
    command.log(log)
  }

  if (P`point`) {
    const tab = await getTab({ tabId })
    const log = formatTab(tab)

    storage.set(storageKeys.TAB, tab)

    command.clearLogs()
    command.log(log)
  }

  if (P`switch`) {
    const tab = await getTab({ tabId })
    const window = await getWindow({ windowId: tab.windowId })

    if (!window.focused) await updateWindow({ windowId: tab.windowId, focused: true })
    await updateTab({ tabId: tab.id, selected: true })

    const log = formatTab(tab)

    command.clearLogs()
    command.log(log)
  }

  if (P`close`) {
    const tab = await getTab({ tabId })
    const log = formatTab(tab)

    await closeTab({ tabId: tab.id })

    command.clearLogs()
    command.log(log)
  }

  if (P`open`) {
    if (P`wait`) command.log(['"Please wait while the page is loading."'])
    const tab = await createTab({
      url: P`url`,
      active: P`active`,
      wait: P`wait`
    })

    const log = formatTab(tab, P`url`)

    command.clearLogs()
    command.log(log)
  }

  if (P`current`) {
    const tab = await getCurrentTab()
    const log = formatTab(tab)

    command.log(log)
  }

  if (P`pointing`) {
    const tab = await getTab({ tabId })
    const log = formatTab(tab)

    command.log(log)
  }

  if (P`list`) {
    const tabs = await getTabsSearch({
      muted: P`muted`,
      unmuted: P`unmuted`,
      byIncognito: P`incognito`,
      byTitle: P`title`,
      byUrl: P`url`,
      byWindowId: P`window-id`,
      byGroupId: P`group-id`,
      byTabId: P`tab-id`
    })
    const logs = tabs.map(formatTab)

    command.clearLogs()
    command.log(...logs)
  }

  if (P`help`) createHelpView(command)
}
