class ConnectedTabs {
  constructor() {
    this.list = []

    chrome.tabs.onRemoved.addListener(this.removeIdFromList.bind(this))
    chrome.tabs.onUpdated.addListener(this.removeReloadedTabs.bind(this))
  }

  addIdToList(id) {
    this.list = this.list.includes(id) ? this.list : [...this.list, id]
  }

  removeIdFromList(id) {
    this.list = this.list.filter((item) => item !== id)
  }

  removeReloadedTabs(id, { status }) {
    if (status !== 'loading') return

    this.removeIdFromList(id)
  }
}

export const connectedTabs = new ConnectedTabs()
