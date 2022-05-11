class ConnectedTab {
  constructor() {
    this.events = []

    chrome.runtime.onMessage.addListener(this._handleMessageListener.bind(this))
  }

  _handleMessageListener(message, sender, sendResponse) {
    this.events.forEach((event) => event(message, sender, sendResponse))
  }

  addMessageListener(callback) {
    if (!this.events.includes(callback)) {
      this.events.push(callback)
    }
  }

  removeMessageListener(callback) {
    this.events = this.events.filter((event) => event !== callback)
  }
}

export const connectedTab = new ConnectedTab()
