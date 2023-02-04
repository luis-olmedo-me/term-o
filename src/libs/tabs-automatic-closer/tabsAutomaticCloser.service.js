import { removeDuplicatedFromArray } from '@helpers/utils.helpers'

class TabAutomaticCloser {
  constructor() {
    this.bannedTabIds = []

    chrome.tabs.onCreated.addListener(this.onTabCreation.bind(this))
  }

  getBannedTabs() {
    return this.bannedTabIds
  }

  onTabCreation(tab) {
    if (this.bannedTabIds.includes(tab.openerTabId)) chrome.tabs.remove(tab.id)
  }

  addTabs(tabIds) {
    const newBannedTabIds = [...this.bannedTabIds, ...tabIds]

    this.bannedTabIds = removeDuplicatedFromArray(newBannedTabIds)
  }

  removeTabs(tabIds) {
    this.bannedTabIds = this.bannedTabIds.filter(id => tabIds.includes(id))
  }
}

export const tabAutomaticCloser = new TabAutomaticCloser()
