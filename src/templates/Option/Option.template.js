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
    return `--${this.name} (-${this.abbreviation})`
  }

  setValue(value) {
    this.value = value
  }

  validate(value, props, manager) {
    if (!this.validations) return
    this.validations.forEach(validation => validation(this, value, props, manager))
  }
}
