export class StorageSimple {
  constructor(storageService, { key, json, namespace, storageValue }) {
    this.$storageService = storageService
    this.$key = key
    this.$json = json
    this.$namespace = namespace
    this.$storageValue = storageValue
  }

  get $value() {
    return this.$latest().value
  }

  $update(storageValue) {
    if (storageValue.version === this.$storageValue.version) return

    this.$storageValue = storageValue
  }

  $latest() {
    return this.$storageValue
  }
}
