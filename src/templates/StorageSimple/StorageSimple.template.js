export class StorageSimple {
  constructor(storageService, value) {
    this.storageService = storageService
    this.value = value
  }

  replicate(value) {
    return new StorageSimple(this.storageService, value)
  }

  get() {
    return this.value
  }
}
