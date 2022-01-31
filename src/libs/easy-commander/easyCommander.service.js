import React from 'react'

import { Outputs } from './components/Outputs/Outputs.component'
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

  getLogOutput(id, fullLine) {
    const lines = fullLine.split('|').map((line) => line.trim())

    const setOfOutputs = lines.map((line) => {
      const [command, ...args] = line.split(' ')

      const knownCommand = this.commands[command]

      const propValues = this.parser(args)

      const props = {
        ...this.buildProps(propValues, knownCommand?.props),
        command: line,
        id
      }

      return (providerProps) =>
        knownCommand?.output({ ...props, ...providerProps }) || null
    })

    return <Outputs key={id} components={setOfOutputs} />
  }
}

export const commander = new Commander()
