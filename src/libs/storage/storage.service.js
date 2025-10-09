import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import { getStorageValue } from '@src/helpers/storage.helpers'
import EventListener from '@src/templates/event-listener'

class Storage extends EventListener {
  constructor() {
    super()

    this.events = []

    this.init()
  }

  async init() {
    this.events = await getStorageValue(storageNamespaces.LOCAL, storageKeys.EVENTS, [])

    chrome.storage.onChanged.addListener(this.handleStorageChanges.bind(this))
  }

  handleStorageChanges(changes, changesNamespace) {
    if (changesNamespace !== storageNamespaces.LOCAL) return

    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === storageKeys.EVENTS) {
        this.events = newValue
      }
    }
  }
}

export const storage = new Storage()
