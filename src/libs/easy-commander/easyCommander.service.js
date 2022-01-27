import { consoleCommands } from './easyCommander.constants'
class Commander {
  constructor() {
    this.parser = null

    this.commands = consoleCommands
  }

  setParser(parser) {
    this.parser = parser
  }

  validatePropValue(value, type, defaultValue) {
    switch (type) {
      case 'array': {
        const parsedString = typeof value === 'string' ? [value] : null
        const parsedArray = Array.isArray(value) ? value : null

        return parsedString || parsedArray || defaultValue
      }

      default:
        return typeof value === type ? value : defaultValue
    }
  }

  buildProps({ _, ...propValues }, propsConfig = {}) {
    const validatedProps = Object.entries(propsConfig).reduce(
      (allProps, [propName, { type, defaultValue }]) => {
        const value = propValues[propName]
        const validatedValue = this.validatePropValue(value, type, defaultValue)

        return { ...allProps, [propName]: validatedValue }
      },
      {}
    )

    return {
      values: _,
      ...validatedProps
    }
  }

  getLogOutput(id, line) {
    const [command, ...args] = line.split(' ')

    const knownCommand = this.commands[command]

    const propValues = this.parser(args)
    const props = {
      ...this.buildProps(propValues, knownCommand?.props),
      command: line
    }

    return knownCommand?.output({ ...props, id }) || null
  }
}

export const commander = new Commander()
