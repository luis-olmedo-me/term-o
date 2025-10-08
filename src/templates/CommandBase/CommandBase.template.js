import Command from '@src/templates/Command'
import OptionsManager from '@src/templates/OptionsManager'

import { optionDefaultValues } from '@src/constants/options.constants'

export class CommandBase {
  constructor({ name, helpSectionTitles }) {
    this.name = name
    this.helpSectionTitles = helpSectionTitles
    this.options = new OptionsManager()
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
    const value = (defaultValue || optionDefaultValues[type]) ?? optionDefaultValues.none

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
