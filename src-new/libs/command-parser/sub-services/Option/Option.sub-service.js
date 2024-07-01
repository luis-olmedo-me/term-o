export class Option {
  constructor({ name, value, type, abbreviation, validations, dependencies }) {
    this.name = name
    this.value = value
    this.type = type
    this.abbreviation = abbreviation
    this.validations = validations
    this.dependencies = dependencies
  }

  setValue(value) {
    this.value = value
  }

  validate() {
    if (this.validations) this.validations.forEach(validation => validation(value))
  }
}
