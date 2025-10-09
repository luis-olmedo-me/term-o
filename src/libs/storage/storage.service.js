import { defaultConfigSections } from '@src/constants/config.constants'
import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import { getStorageValue } from '@src/helpers/storage.helpers'
import EventListener from '@src/templates/event-listener'

class Storage extends EventListener {
  constructor() {
    super()

    this.events = []
    this.history = []
    this.aliases = []
    this.config = this.init()
  }

  async init() {
    this.events = await getStorageValue(storageNamespaces.LOCAL, storageKeys.EVENTS, [])
    this.history = await getStorageValue(storageNamespaces.SESSION, storageKeys.HISTORY, [])
    this.aliases = await getStorageValue(storageNamespaces.LOCAL, storageKeys.ALIASES, [])
    this.config = await getStorageValue(
      storageNamespaces.LOCAL,
      storageKeys.CONFIG,
      defaultConfigSections
    )

    chrome.storage.onChanged.addListener(this.handleStorageChanges.bind(this))
  }

  handleStorageChanges(changes) {
    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === storageKeys.EVENTS) {
        this.events = newValue
      }
      if (storageKey === storageKeys.HISTORY) {
        this.history = newValue
      }
      if (storageKey === storageKeys.ALIASES) {
        this.aliases = newValue
      }
      if (storageKey === storageKeys.CONFIG) {
        this.config = newValue
      }
    }
  }
}

export const storage = new Storage()
