class ConfigManager {
  constructor() {
    this.config = {
      consolePosition: {},
      pageEvents: [],
      aliases: []
    }
    this.onChange = () => {}
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

  setConfig(newConfig, shouldUpdateTabs = true) {
    this.config = {
      ...this.config,
      ...newConfig,
      consolePosition: {
        ...this.consolePosition,
        ...(newConfig.consolePosition || {})
      }
    }

    this.setConfigInLocalStorage(shouldUpdateTabs)

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

  setConfigInLocalStorage(shouldUpdateTabs) {
    chrome.storage.sync.set({
      configuration: this.config
    })

    this.onChange(shouldUpdateTabs)
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
