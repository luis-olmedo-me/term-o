import { optionDefaultValues } from '@src/constants/options.constants'
import Command from '@src/templates/Command'
import OptionsManager from '@src/templates/OptionsManager'

export class CommandBase {
  constructor({ name, helpSectionTitles, handler }) {
    this.name = name
    this.helpSectionTitles = helpSectionTitles
    this.options = new OptionsManager()
    this.handler = handler
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

  create(origin) {
    const newCommand = new Command({
      name: this.name,
      options: this.options.copy(),
      helpSectionTitles: this.helpSectionTitles,
      origin
    })

    return this.handler ? newCommand.addEventListener('execute', this.handler) : newCommand
  }
}
