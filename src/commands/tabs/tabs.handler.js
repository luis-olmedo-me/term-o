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
    command.update(['"Connecting to the tab."'])
    const validTab = await getTab({ tabId: cleanTabId(P`tab-id`) })

    tabId = validTab.id
  }

  if (P`reload`) {
    if (P`wait`) command.update(['"Please wait while the page is loading."'])
    const tab = await reloadTab({ tabId: cleanTabId(P`reload`), wait: P`wait` })
    const update = formatTab(tab)

    command.reset()
    command.update(update)
  }

  if (P`point`) {
    const tab = await getTab({ tabId: cleanTabId(P`point`) })
    const update = formatTab(tab)

    storage.set(storageKeys.TAB, tab)

    command.reset()
    command.update(update)
  }

  if (P`switch`) {
    const tab = await getTab({ tabId: cleanTabId(P`switch`) })
    const window = await getWindow({ windowId: tab.windowId })

    if (!window.focused) await updateWindow({ windowId: tab.windowId, focused: true })
    await updateTab({ tabId: tab.id, selected: true })

    const update = formatTab(tab)

    command.reset()
    command.update(update)
  }

  if (P`close`) {
    const tab = await getTab({ tabId: cleanTabId(P`close`) })
    const update = formatTab(tab)

    await closeTab({ tabId: tab.id })

    command.reset()
    command.update(update)
  }

  if (P`open`) {
    if (P`wait`) command.update(['"Please wait while the page is loading."'])
    const tab = await createTab({
      url: P`open`,
      active: P`active`,
      wait: P`wait`
    })

    const update = formatTab(tab, P`open`)

    command.reset()
    command.update(update)
  }

  if (P`current`) {
    const tab = await getCurrentTab()
    const update = formatTab(tab)

    command.update(update)
  }

  if (P`pointing`) {
    const tab = await getTab({ tabId })
    const update = formatTab(tab)

    command.update(update)
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
    const updates = tabs.map(formatTab)

    command.reset()
    command.update(...updates)
  }

  if (P`help`) createHelpView(command)
}
