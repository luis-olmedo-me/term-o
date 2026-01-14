import { commandStatuses } from '@src/constants/command.constants'

import { getColor as C } from '@src/helpers/themes.helpers'
import { getArgs } from './arguments.helpers'
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

    nextCommand.setParams(availableArgs)
    nextCommand.prepare()

    if (nextCommand.status === commandStatuses.ERROR) break
    await nextCommand.execute()
    nextCommand.saveUpdates()
    if (nextCommand.status === commandStatuses.ERROR) break
  }

  nextCommand.setParams([])

  if (nextCommand.nextCommand && !nextCommand.failed) {
    await nextCommand.executeNext()
  }
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

const getHighestTitleCountInSection = (sectionNames, options) => {
  return sectionNames.reduce((max, sectionName) => {
    const optionsBySection = options.getByHelpSection(sectionName)

    const highestTitleCountInOptions = optionsBySection.reduce((optionsMax, option) => {
      const displayName = option.displayName
      const type = getOptionTypeLabel(option.type)
      const titleCount = `${displayName} ${type}`.length

      return optionsMax < titleCount ? titleCount : optionsMax
    }, 0)

    return max < highestTitleCountInOptions ? highestTitleCountInOptions : max
  }, 0)
}

export const getHighestTitleCountInBases = bases => {
  return bases.reduce((max, base) => {
    const options = base.options
    const helpSectionsNames = Object.keys(base.helpSectionTitles)
    const highestTitleCountInSection = getHighestTitleCountInSection(helpSectionsNames, options)

    return max < highestTitleCountInSection ? highestTitleCountInSection : max
  }, 0)
}

export const createHelpView = command => {
  let helps = []
  const options = command.options
  const highestTitleCount = command.data.highestTitleCount
  const helpSectionsNames = Object.keys(command.helpSectionTitles)

  helps.push(`${C`foreground`}Usage: ${command.name} [options]\n`)

  helpSectionsNames.forEach(sectionName => {
    const optionsBySection = options.getByHelpSection(sectionName)
    const sectionTitle = command.helpSectionTitles[sectionName]

    helps.push(`${C`foreground`}${sectionTitle}:\n`)

    optionsBySection.forEach(option => {
      const displayName = option.displayName
      const description = option.description
      const type = getOptionTypeLabel(option.type)

      const titleCount = `${displayName} ${type}`.length
      const tab = `.`.repeat(highestTitleCount + 1 - titleCount)

      helps.push(
        `${C`green`}${displayName} ${C`yellow`}${type} ${C`brightBlack`}${tab} ${description}`
      )
    })

    helps.push('')
  })

  command.update(...helps)
}
