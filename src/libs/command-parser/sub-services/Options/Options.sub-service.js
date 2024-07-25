import { Option } from '../Option/Option.sub-service'
import { validate } from './Options.helpers'

export class Options {
  constructor() {
    this.values = []
  }

  get length() {
    return this.values.length
  }

  add(config) {
    this.values = this.values.concat(new Option(config))
  }

  getDependencies() {
    return this.values.reduce((deps, { name, dependencies }) => {
      return dependencies ? { ...deps, [name]: dependencies } : deps
    }, {})
  }

  getStrictDependencies() {
    return this.values.reduce((deps, { name, strictDependencies }) => {
      return strictDependencies ? { ...deps, [name]: strictDependencies } : deps
    }, {})
  }

  getValues() {
    return this.values.reduce((props, { name, value }) => {
      return { ...props, [name]: value }
    }, {})
  }

  setValues(values) {
    const dependencies = this.getDependencies()
    const strictDependencies = this.getStrictDependencies()

    validate(dependencies, strictDependencies, values)

    Object.entries(values).forEach(([name, value]) => {
      this.getByName(name).setValue(value)
    })
  }

  getByName(name) {
    const foundValue = this.values.find(value => value.name === name)

    if (!foundValue) throw `--${name} is not a valid command option.`

    return foundValue
  }

  getByAbbreviation(abbreviation) {
    const foundValue = this.values.find(value => value.abbreviation === abbreviation)

    if (!foundValue) throw `-${abbreviation} is not a valid command option.`

    return foundValue
  }

  copy() {
    const optionsCopy = new Options()

    this.values.forEach(option => {
      optionsCopy.add(option)
    })

    return optionsCopy
  }
}
