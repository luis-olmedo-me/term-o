import { commandStatuses } from '@src/constants/command.constants'

import { getColor as C } from '@src/helpers/themes.helpers'
import { getArgs } from './arguments.helpers'
import { formatWarning } from './format.helpers'
import { getOptionTypeLabel, getParamValue } from './options.helpers'

export const executePerUpdates = async (nextCommand, updates) => {
  const argsHoldingUp = nextCommand.args.filter(arg => arg.isHoldingUp)
  const colorPattern = /\[termo\.color\.[A-Za-z]+\]|\[termo\.bgcolor\.[A-Za-z]+\]/g

  nextCommand.allowToExecuteNext(false)

  for (let update of updates) {
    const cleanedUpdate = update.replace(colorPattern, '')
    const availableArgs = getArgs(cleanedUpdate)

    argsHoldingUp.forEach(arg => {
      const indexes = arg.getIndexes()
      const newValue = getParamValue(indexes, availableArgs)

      arg.setValue(newValue)
    })

    nextCommand.prepare()

    if (nextCommand.status === commandStatuses.ERROR) break
    await nextCommand.execute()
    nextCommand.saveUpdates()
    if (nextCommand.status === commandStatuses.ERROR) break
  }

  if (nextCommand.nextCommand && !nextCommand.failed) {
    await nextCommand.executeNext()
  }
}

export const limitSimplifiedCommands = (commands, maxCount) => {
  let count = 0
  let newCommands = []

  for (let index = -1; index >= -1 * commands.length; index--) {
    const command = commands.at(index)
    count += command.updates.length

    if (count > maxCount) {
      const cutUpdates = command.updates.slice((maxCount - count) * -1)
      const overflowCount = command.updates.length - cutUpdates.length
      const warning = formatWarning({
        title: `Command line limit exceeded. Discarded ${overflowCount} lines.`
      })

      newCommands = [{ ...command, updates: [warning, ...cutUpdates] }, ...newCommands]
      break
    }

    newCommands = [{ ...command, updates: [...command.updates] }, ...newCommands]
  }

  return newCommands
}

export const updateSimplifiedCommandsWith = (simplifiedCommands, command, commandId) => {
  if (!command) return simplifiedCommands

  const isAlreadyAdded = simplifiedCommands.some(oldCommand => oldCommand.id === commandId)

  return isAlreadyAdded
    ? simplifiedCommands.map(oldCommand =>
        oldCommand.id === commandId
          ? { ...oldCommand, updates: command.updates, status: command.status }
          : oldCommand
      )
    : [...simplifiedCommands, command.simplify()]
}

export const createHelpView = command => {
  let helps = []
  const options = command.options
  const helpSectionsNames = Object.keys(command.helpSectionTitles)

  helps.push(`${C`foreground`}Usage: ${command.name} [options]\n`)

  helpSectionsNames.forEach(sectionName => {
    const optionsBySection = options.getByHelpSection(sectionName)
    const sectionTitle = command.helpSectionTitles[sectionName]

    helps.push(`${C`foreground`}${sectionTitle}:\n`)

    optionsBySection.forEach((option, index) => {
      const displayName = option.displayName
      const description = option.description
      const type = getOptionTypeLabel(option.type)

      const shouldBeDoubledTabulated = `${displayName} ${type}`.length < 22
      const tab = shouldBeDoubledTabulated ? `\t\t` : '\t'

      const isLastOption = index === optionsBySection.length - 1
      const lineJump = isLastOption ? '\n' : ''

      helps.push(
        `  ${C`green`}${displayName} ${C`yellow`}${type}${tab}${C`brightBlack`}${description}${lineJump}`
      )
    })

    helps.push('')
  })

  command.update(...helps)
}
