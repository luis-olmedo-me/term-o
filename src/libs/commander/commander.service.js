import * as React from 'preact'

import { consoleCommands } from './commander.constants'
import {
  buildProps,
  getOptionsFromArgs,
  parsePropsIntoSuggestions,
  parseValuesIntoParams,
  removeQuotesFromValue,
  splitArgsTakingInCountSymbols
} from './commander.helpers'
import { commanderMessages } from './commander.messages'
import { Outputs } from './components/Outputs/Outputs.component'
import { MessageLog } from './modules/Log'

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
    return Object.entries(this.aliasesAsObject)
      .reduce((separatedCommandBySpaces, [alias, value]) => {
        return separatedCommandBySpaces.map(commandWord =>
          commandWord === alias ? value : commandWord
        )
      }, command.split(' '))
      .join(' ')
  }

  isKeyword(arg) {
    return this.commandNames.includes(arg) || this.aliasNames.includes(arg)
  }

  getSuggestions(command) {
    const [lastCommand] = command.split('|').reverse()
    const allArgsReversed = lastCommand.split(' ').reverse()
    const commandName = allArgsReversed.map(removeQuotesFromValue).find(arg => this.isKeyword(arg))

    const doubleQuotes = lastCommand.match(/"/g)
    const singleQuotes = lastCommand.match(/'/g)
    const doubleQuotesMatches = doubleQuotes ? doubleQuotes.length : 0
    const singleQuotesMatches = singleQuotes ? singleQuotes.length : 0

    const shouldUseDefaults =
      !commandName || doubleQuotesMatches % 2 !== 0 || singleQuotesMatches % 2 !== 0

    const defaultProps = this.commandNames.concat(this.aliasNames).map(name => ({ value: name }))

    const knownCommand = this.commands[commandName]

    const parsedProps = parsePropsIntoSuggestions(knownCommand?.props)

    return shouldUseDefaults ? [...parsedProps, ...defaultProps] : parsedProps
  }

  getLogOutput(id, fullLine) {
    const rawLines = fullLine.split(' ').filter(Boolean)
    const lines = splitArgsTakingInCountSymbols(rawLines)

    const setOfOutputs = lines.map(line => {
      const [command, ...args] = line
      const commandJoined = line.join(' ')
      const knownCommand = this.commands[command]

      const { values, ...propValues } = getOptionsFromArgs(args, knownCommand?.props)
      const props = buildProps(propValues, knownCommand?.props)

      const hasKnownCommand = Boolean(knownCommand)

      return ({ providerProps, possibleParams, id }) => {
        if (!hasKnownCommand) {
          return <MessageLog {...commanderMessages.unknownCommandError} command={commandJoined} />
        }

        const params = parseValuesIntoParams(values, possibleParams)
        const commonProps = {
          props,
          terminal: { ...providerProps, command: commandJoined, params },
          id
        }

        return <knownCommand.output {...commonProps} />
      }
    })

    return outsideProps => (
      <Outputs key={id} components={setOfOutputs} outsideProps={outsideProps} />
    )
  }
}

export const commander = new Commander()
