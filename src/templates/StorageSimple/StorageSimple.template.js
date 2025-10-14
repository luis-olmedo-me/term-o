export class StorageSimple {
  constructor(storageService, storageValue) {
    this.storageService = storageService
    this.storageValue = {
      value: storageValue.value,
      version: storageValue.version
    }
  }

  get value() {
    return this.latest().value
  }

  set(storageValue) {
    if (this.storageValue.version === storageValue.version) return

    this.storageValue = {
      value: storageValue.value,
      version: storageValue.version
    }
  }

  update(storageValue) {
    if (storageValue.version === this.storageValue.version) return

    this.storageValue = storageValue
  }

  latest() {
    return this.storageValue
  }
}
