import React from 'react'
import { MessageCommand } from './components/MessageCommand/MessageCommand.component'

import { Outputs } from './components/Outputs/Outputs.component'
import { consoleCommands, parameterTypes } from './easyCommander.constants'
import { parseArgsIntoCommands } from './easyCommander.helpers'

const unknownCommandError = {
  message: 'The command you entered is not recognized. Please try again.',
  type: parameterTypes.ERROR
}

class Commander {
  constructor() {
    this.commands = consoleCommands
  }

  getSuggestions(command) {
    const [lastCommand] = command.split('|').reverse()
    const [commandName, ...commandArgs] = lastCommand.split(' ')
    const commandNames = Object.keys(this.commands)

    const defaultProps = commandNames.reduce((finalProps, command) => {
      const isMatch = command.includes(commandName)

      return isMatch ? [...finalProps, { value: command }] : finalProps
    }, [])

    const knownCommand = this.commands[commandName]
    const { _: _values, ...props } = parseArgsIntoCommands(commandArgs)
    const propsInUse = Object.keys(props)

    const parsedProps =
      knownCommand &&
      Object.keys(knownCommand.props).reduce((result, key) => {
        const propConfig = knownCommand.props[key]
        const isInUse =
          propsInUse.includes(key) ||
          propConfig.aliases.some((alias) => propsInUse.includes(alias))

        return !isInUse
          ? [...result, { ...propConfig, value: `--${key}` }]
          : result
      }, [])

    return knownCommand ? parsedProps : defaultProps
  }

  validatePropValue(value, type, defaultValue) {
    switch (type) {
      case 'array': {
        const isTrickyType = ['string', 'number'].includes(typeof value)
        const parsedValue = isTrickyType ? [value] : null
        const parsedArray = Array.isArray(value) ? value : null

        return parsedValue || parsedArray || defaultValue
      }

      default:
        return typeof value === type ? value : defaultValue
    }
  }

  buildGroupProps({ _, ...propValues }, groupPropConfigs = {}) {
    return Object.entries(propValues).reduce((allProps, [name, value]) => {
      const groupConfig = groupPropConfigs[name]

      if (!groupConfig) return allProps

      const validatedValue = this.validatePropValue(
        value,
        groupConfig.type,
        groupConfig.defaultValue
      )

      return { ...allProps, [groupConfig.key]: validatedValue }
    }, {})
  }

  buildProps({ _, ...propValues }, propsConfig = {}) {
    const validatedProps = Object.entries(propsConfig).reduce(
      (
        allProps,
        [propName, { key, type, defaultValue, aliases, groupProps }]
      ) => {
        const aliasName = Object.keys(propValues).find((name) => {
          return aliases.includes(name)
        })

        const groupValue = groupProps
          ? this.buildGroupProps(propValues, groupProps)
          : null

        const value =
          propValues[propName] || propValues[aliasName] || groupValue
        const validatedValue = this.validatePropValue(value, type, defaultValue)

        return { ...allProps, [key]: validatedValue }
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

      const propValues = parseArgsIntoCommands(args)
      const props = {
        ...this.buildProps(propValues, knownCommand?.props),
        command: line
      }

      const hasKnownCommand = Boolean(knownCommand)

      return (providerProps) => {
        const commonProps = {
          ...props,
          ...providerProps
        }

        if (!hasKnownCommand) {
          const errorProps = {
            ...commonProps,
            messageData: unknownCommandError
          }

          return <MessageCommand {...errorProps} />
        } else if (!providerProps.messageData.message) {
          return knownCommand?.output(commonProps) || null
        } else {
          return <MessageCommand {...commonProps} />
        }
      }
    })

    return (outsideProps) => (
      <Outputs {...outsideProps} key={id} components={setOfOutputs} />
    )
  }
}

export const commander = new Commander()
