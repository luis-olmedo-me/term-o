import { helpOptionConfig, optionDefaultValues } from '@src/constants/options.constants'
import Command from '@src/templates/Command'
import OptionsManager from '@src/templates/OptionsManager'

export class CommandBase {
  constructor({ name, handler }) {
    this.name = name
    this.options = new OptionsManager()
    this.handler = handler
  }

  expect({
    name,
    type,
    defaultValue,
    abbreviation,
    validate,
    description,
    helpSection,
    repeatable = false
  }) {
    const defaultValueByRepeatanceness = repeatable ? optionDefaultValues.repeated : null
    const value =
      defaultValue ??
      defaultValueByRepeatanceness ??
      optionDefaultValues[type] ??
      optionDefaultValues.none

    this.options.add({
      name,
      value,
      type,
      abbreviation,
      helpSection,
      description,
      repeatable,
      validations: validate
    })

    return this
  }

  create() {
    const hasOptions = this.options.values.length > 0
    const hasHelpOption = !!this.options.getByName('help', false)

    if (hasOptions && !hasHelpOption) this.expect(helpOptionConfig)

    const newCommand = new Command({
      name: this.name,
      options: this.options.copy()
    })

    return this.handler ? newCommand.addEventListener('execute', this.handler) : newCommand
  }
}
