export class Argument {
  constructor(value) {
    this.backup = value
    this.value = value
    this.isHoldingUp = false
  }

  setValue(newValue) {
    this.isHoldingUp = false
    this.value = newValue
  }

  holdUp() {
    this.isHoldingUp = true
  }

  getIndexes() {
    const value = this.backup
    const paramPattern = /^\$\d+(,\d+)?(-\d+)?$/

    if (paramPattern.test(value)) {
      const indexesAsString = value.replace('$', '')

      return JSON.parse(`[${indexesAsString}]`)
    }

    return -1
  }
}
