export class Option {
  constructor({ name, value, type, abbreviation, validations, dependencies }) {
    this.name = name
    this.value = value
    this.type = type
    this.abbreviation = abbreviation
    this.validations = validations
    this.dependencies = dependencies
    this.expectsReplacement = false
  }

  setValue(value) {
    this.expectsReplacement = false

    this.value = value
  }

  validate(value) {
    if (this.expectsReplacement) return

    if (this.validations) this.validations.forEach(validation => validation(value))
  }

  holdUp() {
    this.expectsReplacement = true
  }
}
