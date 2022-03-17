class ConfigManager {
  constructor() {
    this.consolePosition = {}
    this.pageEvents = []
    this.aliases = {}
    this.onChange = () => {}
  }

  setConsolePosition(newConfig, sender) {
    this.consolePosition = { ...this.consolePosition, ...newConfig }
    this.setConfigInLocalStorage(sender)

    return this
  }

  setAliases(newConfig, sender) {
    this.aliases = newConfig
    this.setConfigInLocalStorage(sender)

    return this
  }

  setPageEvents(newConfig, sender) {
    this.pageEvents = newConfig
    this.setConfigInLocalStorage(sender)

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
      this.aliases = receiveConfiguration?.aliases || {}
    }

    chrome.storage.sync.get('configuration', receiveConfiguration)
  }

  setConfigInLocalStorage(sender) {
    chrome.storage.sync.set({
      configuration: {
        consolePosition: this.consolePosition,
        pageEvents: this.pageEvents,
        aliases: this.aliases
      }
    })

    this.onChange(sender)
  }

  getConfiguration() {
    return {
      consolePosition: this.consolePosition,
      pageEvents: this.pageEvents,
      aliases: this.aliases
    }
  }
}

export const configManager = new ConfigManager().init()
