import Option from '@src/templates/Option'

export class OptionsManager {
  constructor() {
    this.values = []
  }

  get length() {
    return this.values.length
  }

  add(config) {
    this.values = this.values.concat(new Option(config))
  }

  getValues() {
    return this.values.reduce((props, { name, value }) => {
      return { ...props, [name]: value }
    }, {})
  }

  setValues(values) {
    Object.entries(values).forEach(([name, value]) => {
      this.getByName(name).setValue(value)
    })
  }

  getByName(name, canFail = true) {
    const foundValue = this.values.find(value => value.name === name)

    if (canFail && !foundValue) throw `"--${name}" is not a valid command option.`

    return foundValue
  }

  getByAbbreviation(abbreviation) {
    const foundValue = this.values.find(value => value.abbreviation === abbreviation)

    if (!foundValue) throw `"-${abbreviation}" is not a valid command option.`

    return foundValue
  }

  getByHelpSection(helpSectionName) {
    return this.values.filter(value => value.helpSection === helpSectionName)
  }

  getHelpSectionsAvailable() {
    return this.values.reduce(
      (sections, { helpSection }) =>
        !sections.includes(helpSection) ? sections.concat(helpSection) : sections,
      []
    )
  }

  copy() {
    const optionsCopy = new OptionsManager()

    this.values.forEach(option => optionsCopy.add(option))

    return optionsCopy
  }
}
