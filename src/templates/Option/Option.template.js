export class Option {
  constructor({
    name,
    value,
    type,
    abbreviation,
    helpSection,
    description,
    repeatable,
    validations
  }) {
    this.name = name
    this.value = value
    this.type = type
    this.abbreviation = abbreviation
    this.helpSection = helpSection
    this.description = description
    this.repeatable = repeatable
    this.validations = validations
  }

  get displayName() {
    return `-${this.abbreviation}, --${this.name}`
  }

  setValue(value) {
    this.value = value
  }

  validate(value, props) {
    if (this.validations) this.validations.forEach(validation => validation(this, value, props))
  }
}
