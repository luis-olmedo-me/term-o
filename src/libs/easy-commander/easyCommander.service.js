import React from 'react'
import { MessageCommand } from './components/MessageCommand/MessageCommand.component'

import { Outputs } from './components/Outputs/Outputs.component'
import { consoleCommands } from './easyCommander.constants'
import { parameterTypes } from './constants/commands.constants'

import {
  buildProps,
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

  getLogOutput(id, fullLine) {
    const rawLines = fullLine.split(' ').filter(Boolean)
    const lines = splitArgsTakingInCountSymbols(rawLines)

    const setOfOutputs = lines.map((line) => {
      const [command, ...args] = line
      const knownCommand = this.commands[command]

      const propValues = getOptionsFromArgs(args)
      const props = buildProps(propValues, knownCommand?.props)

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
