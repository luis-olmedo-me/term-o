import { commandStatuses } from '@src/constants/command.constants'

import { getColor as C, cleanColors } from '@src/helpers/themes.helpers'
import { getOptionTypeLabel } from './options.helpers'

export const executePerUpdates = async (nextCommand, updates) => {
  const argsHoldingUp = nextCommand.args.filter(arg => arg.isHoldingUp)

  nextCommand.allowToExecuteNext(false)

  for (let args of updates) {
    const update = stringifyFragments(args)
    const cleanedUpdate = cleanColors(update)

    argsHoldingUp.forEach(arg => {
      let newValue = arg.getValueFromArgs(cleanedUpdate, args)
      const isArray = Array.isArray(newValue)
      const isString = typeof newValue === 'string'

      if (isArray) newValue = newValue.map(cleanColors)
      if (isString) newValue = cleanColors(newValue)

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

export const stringifyFragments = fragments => {
  return fragments
    .flatMap(fragment => {
      const isString = typeof fragment === 'string'

      return !isString ? `[${stringifyUpdates([fragment])}]` : fragment
    })
    .join(' ')
}

export const stringifyUpdates = fragmentsRaw => {
  return fragmentsRaw.reduce((lines, fragments) => {
    const line = stringifyFragments(fragments)

    return lines.concat(line)
  }, [])
}
