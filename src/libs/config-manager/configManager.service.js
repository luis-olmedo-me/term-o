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

  setConfig(newConfig, sender, shouldUpdateCurrentTab = true) {
    this.config = {
      ...this.config,
      ...newConfig,
      consolePosition: {
        ...this.consolePosition,
        ...(newConfig.consolePosition || {})
      }
    }

    this.setConfigInLocalStorage(sender, shouldUpdateCurrentTab)

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

  setConfigInLocalStorage(sender, shouldUpdateCurrentTab) {
    chrome.storage.sync.set({
      configuration: this.config
    })

    this.onChange(sender, shouldUpdateCurrentTab)
  }
}

export const configManager = new ConfigManager().init()
