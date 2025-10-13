export class SimpleApi {
  constructor(storageService, value) {
    this.storageService = storageService
    this.value = value
  }

  set(value) {
    this.value = value
  }

  get() {
    return this.value
  }
}
