import { Command } from '../command/command.sub-service'
import { Options } from '../Options/Options.sub-service'
import { defaultValues } from './command-template.constants'

export class CommandTemplate {
  constructor({ name }) {
    this.name = name
    this.options = new Options()
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

  create() {
    return new Command({
      name: this.name,
      options: this.options
    })
  }
}
