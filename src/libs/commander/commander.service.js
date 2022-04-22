import React from 'react'
import { MessageCommand } from './components/MessageCommand/MessageCommand.component'

import { Outputs } from './components/Outputs/Outputs.component'
import { consoleCommands } from './commander.constants'

import {
  buildProps,
  getOptionsFromArgs,
  parsePropsIntoSuggestions,
  splitArgsTakingInCountSymbols
} from './commander.helpers'
import { commanderMessages } from './commander.messages'

const paramSyntaxPattern = /^\$\d+$/
const parseValuesIntoParams = (values, posibleParams) => {
  return values.reduce((params, value) => {
    if (paramSyntaxPattern.test(value)) {
      const paramIndex = Number(value.replace('$', ''))
      const isParamIndexValid = paramIndex + 1 <= posibleParams.length

      return isParamIndexValid
        ? params.concat(posibleParams[paramIndex])
        : params
    }

    return params
  }, [])
}

class Commander {
  constructor() {
    this.commands = consoleCommands
    this.aliases = []
  }

  get commandNames() {
    return Object.keys(this.commands)
  }
  get aliasNames() {
    return Object.keys(this.aliasesAsObject)
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

  isKeyword(arg) {
    return this.commandNames.includes(arg) || this.aliasNames.includes(arg)
  }

  getSuggestions(command) {
    const [lastCommand] = command.split('|').reverse()
    const allArgsReversed = lastCommand.split(' ').reverse()
    const commandName = allArgsReversed.find((arg) => this.isKeyword(arg))

    const defaultProps = this.commandNames
      .concat(this.aliasNames)
      .map((name) => ({ value: name }))

    const knownCommand = this.commands[commandName]

    const parsedProps = parsePropsIntoSuggestions(knownCommand?.props)

    return [...parsedProps, ...defaultProps]
  }

  getLogOutput(id, fullLine) {
    const rawLines = fullLine.split(' ').filter(Boolean)
    const lines = splitArgsTakingInCountSymbols(rawLines)

    const setOfOutputs = lines.map((line) => {
      const [command, ...args] = line
      const knownCommand = this.commands[command]

      const { values, ...propValues } = getOptionsFromArgs(args)
      const props = buildProps(propValues, knownCommand?.props)

      const hasKnownCommand = Boolean(knownCommand)

      return ({ providerProps, possibleParams }) => {
        const params = parseValuesIntoParams(values, possibleParams)
        const commonProps = {
          props,
          terminal: { ...providerProps, command: line.join(' '), params }
        }

        if (!hasKnownCommand) {
          const errorProps = {
            ...commonProps,
            terminal: {
              ...commonProps.terminal,
              messageData: commanderMessages.unknownCommandError
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
