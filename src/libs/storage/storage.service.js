import EventListener from '@src/templates/EventListener'

import { getStorageValue, setStorageValue } from '@src/browser-api/storage.api'
import { storageDefaultValues, storageValues } from '@src/constants/storage.constants'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

class Storage extends EventListener {
  constructor() {
    super()

    this.initiated = false
    this.values = storageDefaultValues

    this.init()
  }

  async init() {
    const promises = storageValues.map(({ namespace, key, defaultValue, Template }) => {
      const defaultStorageValue = { value: defaultValue, version: createUUIDv4() }

      return getStorageValue(namespace, key, defaultStorageValue).then(result => {
        const isDefault = result === defaultStorageValue

        if (isDefault) setStorageValue(namespace, key, result)
        return new Template(this, result)
      })
    })

    const results = await Promise.all(promises)

    storageValues.forEach((value, index) => {
      this.values[value.key] = results[index]
    })

    chrome.storage.onChanged.addListener(this.handleStorageChanges.bind(this))

    this.initiated = true
    this.dispatchEvent('init', this)
  }

  get(storageKey) {
    return this.getInstance(storageKey).value
  }

  set(storageKey, newValue) {
    if (storageKey in this.values) {
      const storageDefaults = storageValues.find(value => value.key === storageKey)
      const instance = this.getInstance(storageKey)

      instance.update({ value: newValue, version: createUUIDv4() })
      setStorageValue(storageDefaults.namespace, storageKey, instance.latest())
    }
  }

  getInstance(storageKey) {
    return this.values[storageKey]
  }

  handleStorageChanges(changes) {
    for (let [storageKey, { newValue: storageValue }] of Object.entries(changes)) {
      if (!(storageKey in this.values)) return
      const instance = this.getInstance(storageKey)

      instance.update(storageValue)
      this.dispatchEvent(storageKey, this)
    }
  }
}

export const storage = new Storage()
