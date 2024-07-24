import { defaultValues } from '../command/command.constants'
import { Options } from '../Options/Options.sub-service'

export class CommandTemplate {
  constructor({ name }) {
    this.formatter = null
    this.name = name
    this.options = new Options()
  }

  setFormatter(newFormatter) {
    this.formatter = newFormatter

    return this
  }

  expect({ name, type, defaultValue, abbreviation, validate, worksWith, mustHave, description }) {
    const value = (defaultValue || defaultValues[type]) ?? defaultValues.none

    this.options.add({
      name,
      value,
      type,
      abbreviation,
      description,
      validations: validate,
      dependencies: worksWith,
      strictDependencies: mustHave
    })

    return this
  }

  from() {}
}
