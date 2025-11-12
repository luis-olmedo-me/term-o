import EventListener from '@src/templates/EventListener'

import { getStorageValue, setStorageValue } from '@src/browser-api/storage.api'
import { storageValues } from '@src/constants/storage.constants'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

class Storage extends EventListener {
  constructor() {
    super()

    this.initiated = false
    this.manualMode = false
    this.handleStorageChangesRef = this.handleStorageChanges.bind(this)
    this.values = storageValues.reduce((values, { key, Template, defaultValue, namespace }) => {
      return {
        ...values,
        [key]: new Template(this, namespace, { value: defaultValue, version: null })
      }
    }, {})

    this.init()
  }

  async init() {
    const promises = storageValues.map(({ namespace, key, defaultValue }) => {
      const defaultStorageValue = { value: defaultValue, version: null }

      return getStorageValue(namespace, key, defaultStorageValue).then(result => {
        const isDefault = result.value === defaultValue

        if (!isDefault) this.getInstance(key).$update(result)
      })
    })

    await Promise.all(promises)

    if (!this.manualMode) chrome.storage.onChanged.addListener(this.handleStorageChangesRef)

    this.initiated = true
    this.dispatchEvent('init', this)
  }

  async restart() {
    const promises = Object.entries(this.values).map(([key, instance]) => {
      return getStorageValue(instance.$namespace, key, instance.$storageValue).then(result => {
        const isDefault = result.value === instance.$storageValue

        if (!isDefault) this.getInstance(key).$update(result)
      })
    })

    await Promise.all(promises)

    if (!this.manualMode && chrome.storage.onChanged.hasListener(this.handleStorageChangesRef)) {
      chrome.storage.onChanged.removeListener(this.handleStorageChangesRef)
    }
    if (!this.manualMode) {
      chrome.storage.onChanged.addListener(this.handleStorageChangesRef)
    }

    this.dispatchEvent('restart', this)
  }

  get(storageKey) {
    return this.getInstance(storageKey).$value
  }

  set(storageKey, newValue) {
    if (storageKey in this.values) {
      const storageDefaults = storageValues.find(value => value.key === storageKey)
      const instance = this.getInstance(storageKey)

      instance.$update({ value: newValue, version: createUUIDv4() })
      setStorageValue(storageDefaults.namespace, storageKey, instance.$latest())
    }
  }

  getInstance(storageKey) {
    return this.values[storageKey]
  }

  handleStorageChanges(changes) {
    for (let [storageKey, { newValue: storageValue }] of Object.entries(changes)) {
      if (!(storageKey in this.values)) return
      const instance = this.getInstance(storageKey)

      instance.$update(storageValue)
      this.dispatchEvent(storageKey, this)
    }
  }

  handleStorageChangesManually() {
    chrome.storage.onChanged.removeListener(this.handleStorageChangesRef)
    this.manualMode = true
  }
}

export const storage = new Storage()
