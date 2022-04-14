class ConnectedTabs {
  constructor() {
    this.list = []

    chrome.tabs.onRemoved.addListener(this.removeIdFromList.bind(this))
  }

  addIdToList(id) {
    this.list = this.list.includes(id) ? this.list : [...this.list, id]
  }

  removeIdFromList(id) {
    this.list = this.list.filter((item) => item !== id)
  }
}

export const connectedTabs = new ConnectedTabs()
