class ConfigManager {
  constructor() {
    this.config = {
      consolePosition: {},
      pageEvents: [],
      aliases: []
    }
  }

  get aliases() {
    return this.config.aliases
  }
  get pageEvents() {
    return this.config.pageEvents
  }
  get consolePosition() {
    return this.config.consolePosition
  }

  setConfig(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig,
      consolePosition: {
        ...this.consolePosition,
        ...(newConfig.consolePosition || {})
      }
    }

    this.setConfigInLocalStorage()

    return this
  }

  init() {
    this.getConfigFromLocalStorage()

    return this
  }

  getConfigFromLocalStorage() {
    const receiveConfiguration = ({ configuration = {} }) => {
      this.config = { ...this.config, ...configuration }
    }

    chrome.storage.sync.get('configuration', receiveConfiguration)
  }

  setConfigInLocalStorage() {
    chrome.storage.sync.set({
      configuration: this.config
    })
  }

  reset() {
    this.config = {
      consolePosition: {},
      pageEvents: [],
      aliases: []
    }

    this.setConfigInLocalStorage()
  }
}

export const configManager = new ConfigManager().init()
