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
    this.aliases = []
  }

  get commandNames() {
    return Object.keys(this.commands)
  }
  get aliasesAsObject() {
    return this.aliases.reduce((finalObject, { name, command }) => {
      return { ...finalObject, [name]: command }
    }, {})
  }

  setAliases(aliases) {
    this.aliases = aliases || []
  }

  getCommandWithAliases(command) {
    return Object.entries(this.aliasesAsObject).reduce(
      (newCommand, [alias, value]) => {
        return newCommand.replaceAll(alias, value)
      },
      command
    )
  }

  getSuggestions(command) {
    const [lastCommand] = this.getCommandWithAliases(command)
      .split('|')
      .reverse()
    const [commandName, ...commandArgs] = lastCommand.trim().split(' ')
    const aliasNames = Object.keys(this.aliasesAsObject)

    const aliasAsProps = aliasNames.map((alias) => ({ value: alias }))
    const defaultProps = this.commandNames
      .map((name) => ({ value: name }))
      .concat(aliasAsProps)

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

      return ({ providerProps }) => {
        const commonProps = {
          props,
          terminal: { ...providerProps, command: line.join(' ') }
        }

        if (!hasKnownCommand) {
          const errorProps = {
            ...commonProps,
            terminal: {
              ...commonProps.terminal,
              messageData: unknownCommandError
            }
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
      <Outputs key={id} components={setOfOutputs} outsideProps={outsideProps} />
    )
  }
}

export const commander = new Commander()
