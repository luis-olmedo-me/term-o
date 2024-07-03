class Argument {
  constructor(value) {
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

  getIndex() {
    const value = this.value
    const paramPattern = /^\$\d+$/g

    if (paramPattern.test(value)) {
      const indexAsString = value.replace('$', '')

      return Number(indexAsString)
    }

    return -1
  }
}
