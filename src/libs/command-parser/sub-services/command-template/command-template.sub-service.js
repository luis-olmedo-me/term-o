import { Command } from '../command/command.sub-service'
import { Options } from '../Options/Options.sub-service'
import { defaultValues } from './command-template.constants'

export class CommandTemplate {
  constructor({ name, helpSectionTitles }) {
    this.name = name
    this.helpSectionTitles = helpSectionTitles
    this.options = new Options()
    this.handler = null
  }

  setHandler(handler) {
    this.handler = handler

    return this
  }

  expect({
    name,
    type,
    defaultValue,
    abbreviation,
    validate,
    worksWith,
    mustHave,
    description,
    helpSection
  }) {
    const value = (defaultValue || defaultValues[type]) ?? defaultValues.none

    this.options.add({
      name,
      value,
      type,
      abbreviation,
      helpSection,
      description,
      validations: validate,
      dependencies: worksWith,
      strictDependencies: mustHave
    })

    return this
  }

  create(executionContext) {
    const newCommand = new Command({
      name: this.name,
      options: this.options.copy(),
      helpSectionTitles: this.helpSectionTitles,
      executionContext
    })

    return this.handler ? newCommand.addEventListener('execute', this.handler) : newCommand
  }
}
