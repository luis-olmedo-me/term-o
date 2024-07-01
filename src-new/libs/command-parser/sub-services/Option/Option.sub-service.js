export class Option {
  constructor({ value, type, abbreviation, validations, dependencies }) {
    this.value = value
    this.type = type
    this.abbreviation = abbreviation
    this.validations = validations
    this.dependencies = dependencies
  }
}
