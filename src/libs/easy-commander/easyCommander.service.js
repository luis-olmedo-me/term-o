import React from 'react'
import { MessageCommand } from './components/MessageCommand/MessageCommand.component'

import { Outputs } from './components/Outputs/Outputs.component'
import { consoleCommands, parameterTypes } from './easyCommander.constants'
import {
  getOptionsFromArgs,
  parsePropsIntoSuggestions,
  splitArgsTakingInCountSymbols
} from './easyCommander.helpers'

const unknownCommandError = {
  message: 'The command you entered is not recognized. Please try again.',
  type: parameterTypes.ERROR
}

class Commander {
  constructor() {
    this.commands = consoleCommands
    this.aliases = {}
  }

  setAliases(aliases) {
    this.aliases = aliases || {}
  }

  getCommandWithAliases(command) {
    return Object.entries(this.aliases).reduce((newCommand, [alias, value]) => {
      return newCommand.replaceAll(alias, value)
    }, command)
  }

  getSuggestions(command) {
    const [lastCommand] = this.getCommandWithAliases(command)
      .split('|')
      .reverse()
    const [commandName, ...commandArgs] = lastCommand.trim().split(' ')
    const commandNames = Object.keys(this.commands)
    const aliasNames = Object.keys(this.aliases)

    const aliasAsProps = aliasNames.reduce((finalProps, name) => {
      const isMatch = name.includes(commandName)

      return isMatch ? [...finalProps, { value: name }] : finalProps
    }, [])
    const defaultProps = commandNames.reduce((finalProps, name) => {
      const isMatch = name.includes(commandName)

      return isMatch ? [...finalProps, { value: name }] : finalProps
    }, aliasAsProps)

    const knownCommand = this.commands[commandName]
    const { values: _values, ...props } = getOptionsFromArgs(commandArgs)

    const parsedProps = parsePropsIntoSuggestions(knownCommand?.props, props)

    return knownCommand && commandArgs.length ? parsedProps : defaultProps
  }

  validatePropValue(value, type, defaultValue) {
    switch (type) {
      case 'array':
        return Array.isArray(value) ? value : defaultValue

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

  buildProps(propValues, propsConfig = {}) {
    return Object.entries(propsConfig).reduce(
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
  }

  getLogOutput(id, fullLine) {
    const rawLines = fullLine.split(' ').filter(Boolean)
    const lines = splitArgsTakingInCountSymbols(rawLines)

    const setOfOutputs = lines.map((line) => {
      const [command, ...args] = line
      const knownCommand = this.commands[command]

      const propValues = getOptionsFromArgs(args)
      const props = this.buildProps(propValues, knownCommand?.props)

      const hasKnownCommand = Boolean(knownCommand)

      return (providerProps) => {
        const commonProps = {
          props,
          ...providerProps,
          command: line.join(' ')
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
