class ConnectedTabs {
  constructor() {
    const self = this
    self.list = []

    chrome.tabs.onRemoved.addListener(self.removeIdFromList.bind(self))
    chrome.tabs.onUpdated.addListener(self.expectForTabUpdate.bind(self))
    chrome.tabs.query({}, function (tabs) {
      self.list = tabs.map(({ favIconUrl, title, url, id }) => ({
        favIconUrl,
        title,
        url,
        id
      }))
    })
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
  }
}

export const connectedTabs = new ConnectedTabs()
