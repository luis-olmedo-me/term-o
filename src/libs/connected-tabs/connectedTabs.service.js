class ConnectedTabs {
  constructor() {
    this.list = []

    chrome.tabs.onRemoved.addListener(this.removeIdFromList.bind(this))
    chrome.tabs.onUpdated.addListener(this.expectForTabUpdate.bind(this))
  }

  addIdToList(newId, { favIconUrl, title, url }) {
    const isAlreadyInList = this.list.some(({ id }) => newId === id)

    this.list = isAlreadyInList
      ? this.list.map((otherTab) => {
          return otherTab.id === newId
            ? { ...otherTab, favIconUrl, title, url }
            : otherTab
        })
      : [...this.list, { favIconUrl, title, url, id: newId }]
  }

  removeIdFromList(id) {
    this.list = this.list.filter((item) => item !== id)
  }

  expectForTabUpdate(id, _changeInfo, tab) {
    this.addIdToList(id, tab)

    console.log('this.list', this.list)
  }
}

export const connectedTabs = new ConnectedTabs()
