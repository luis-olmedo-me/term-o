import { getColor as C } from '@src/theme/theme.helpers'
import { Option } from '../Option/Option.sub-service'
import { validate } from './Options.helpers'

export class Options {
  constructor() {
    this.values = []
  }

  get length() {
    return this.values.length
  }

  add({ name, value, type, abbreviation, validations, dependencies }) {
    this.values = this.values.concat(
      new Option({
        name,
        value,
        type,
        abbreviation,
        validations,
        dependencies
      })
    )
  }

  getDependencies() {
    return this.values.reduce((deps, { name, dependencies }) => {
      return dependencies ? { ...deps, [name]: dependencies } : deps
    }, {})
  }

  getValues() {
    return this.values.reduce((props, { name, value }) => {
      return { ...props, [name]: value }
    }, {})
  }

  setValues(values) {
    const dependencies = this.getDependencies()

    validate(dependencies, values)

    Object.entries(values).forEach(([name, value]) => {
      this.getByName(name).setValue(value)
    })
  }

  getByName(name) {
    const foundValue = this.values.find(value => value.name === name)

    if (!foundValue) throw `${C`bright-red`}--${name}${C`red`} is not a valid command option.`

    return foundValue
  }

  getByAbbreviation(abbreviation) {
    const foundValue = this.values.find(value => value.abbreviation === abbreviation)

    if (!foundValue)
      throw `${C`bright-red`}-${abbreviation}${C`red`} is not a valid command option.`

    return foundValue
  }
}
