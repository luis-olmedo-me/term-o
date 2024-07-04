export class Option {
  constructor({ name, value, type, abbreviation, validations, dependencies }) {
    this.name = name
    this.value = value
    this.type = type
    this.abbreviation = abbreviation
    this.validations = validations
    this.dependencies = dependencies
  }

  get displayName() {
    return `--${this.name} ( -${this.abbreviation} )`
  }

  setValue(value) {
    this.value = value
  }

  validate(value) {
    if (this.validations) this.validations.forEach(validation => validation(this, value))
  }
}
