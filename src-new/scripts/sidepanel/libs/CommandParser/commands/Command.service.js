const defaultValues = {
  string: '',
  boolean: false,
  number: 0,
  array: [],
  object: {},
  none: null
}

export class Command {
  constructor() {
    this.propTypes = {}
    this.defaults = {}
  }

  expectProp({ name, type, defaultValue }) {
    const value = defaultValue || defaultValues[type] || defaultValues.none

    this.propTypes = { ...this.propTypes, [name]: type }
    this.defaults = { ...this.defaults, [name]: value }

    return this
  }
}
