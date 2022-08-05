class ConnectedTabs {
  constructor() {
    this.list = []

    chrome.tabs.onRemoved.addListener(this.removeIdFromList.bind(this))
    chrome.tabs.onUpdated.addListener(this.expectForTabUpdate.bind(this))
  }

  addIdToList(id) {
    this.list = this.list.includes(id) ? this.list : [...this.list, id]
  }

  removeIdFromList(id) {
    this.list = this.list.filter((item) => item !== id)
  }

  expectForTabUpdate(id, { status }) {
    if (status === 'complete') this.addIdToList(id)
    else if (status === 'loading') this.removeIdFromList(id)
  }
}

export const connectedTabs = new ConnectedTabs()
