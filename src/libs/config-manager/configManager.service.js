class ConfigManager {
  constructor() {
    this.consolePosition = {}
    this.pageEvents = []
  }

  setConsolePosition(newConfig) {
    this.consolePosition = { ...this.consolePosition, ...newConfig }
    this.setConfigInLocalStorage()

    return this
  }

  setPageEvents(newConfig) {
    this.pageEvents = newConfig
    this.setConfigInLocalStorage()

    return this
  }

  init() {
    this.getConfigFromLocalStorage()

    return this
  }

  getConfigFromLocalStorage() {
    const receiveConfiguration = ({ configuration: receivedConfiguration }) => {
      this.consolePosition = receivedConfiguration?.consolePosition || {}
      this.pageEvents = receivedConfiguration?.pageEvents || []
    }

    chrome.storage.sync.get('configuration', receiveConfiguration)
  }

  setConfigInLocalStorage() {
    chrome.storage.sync.set({
      configuration: {
        consolePosition: this.consolePosition,
        pageEvents: this.pageEvents
      }
    })
  }

  getConfiguration() {
    return {
      consolePosition: this.consolePosition,
      pageEvents: this.pageEvents
    }
  }
}

export const configManager = new ConfigManager().init()
