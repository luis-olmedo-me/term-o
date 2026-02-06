import { commandStatuses } from '@src/constants/command.constants'

import { getColor as C, cleanColors } from '@src/helpers/themes.helpers'
import { getOptionTypeLabel } from './options.helpers'
import { getQuotedString } from './utils.helpers'

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
    : [...simplifiedCommands, command.jsonUI()]
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
    const helpSectionsNames = base.options.getHelpSectionsAvailable()
    const highestTitleCountInSection = getHighestTitleCountInSection(helpSectionsNames, options)

    return max < highestTitleCountInSection ? highestTitleCountInSection : max
  }, 0)
}

export const createHelpView = command => {
  let helps = []
  const options = command.options
  const highestTitleCount = command.data.highestTitleCount
  const helpSectionsNames = command.options.getHelpSectionsAvailable()

  helpSectionsNames.forEach(sectionName => {
    const optionsBySection = options.getByHelpSection(sectionName)
    const quotedTitle = getQuotedString(sectionName)

    helps.push([`${C`brightPurple`}${quotedTitle}${C`reset`}`])

    optionsBySection.forEach(option => {
      const displayName = option.displayName
      const description = option.description
      const type = getOptionTypeLabel(option.type)

      const titleCount = `${displayName} ${type}`.length
      const tab = `.`.repeat(highestTitleCount + 1 - titleCount)

      const completeDescription = `${C`reset`}${displayName}${C`reset`} ${C`reset`}${type}${C`reset`} ${C`brightBlack`}${tab} ${C`reset`}${description}${C`reset`}`
      const quotedCompleteDescription = getQuotedString(completeDescription)

      helps.push([quotedCompleteDescription])
    })
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

export const makeLogSafe = (log, shouldRemoveColors) => {
  const isArray = log instanceof Array

  if (!isArray) return []

  return log.map(fragment => {
    const isArray = fragment instanceof Array
    const isString = typeof fragment === 'string'

    if (isArray) return makeLogSafe(fragment)
    if (!isString) return String(fragment)
    const hasDoubleQuotes = /^"|"$/g.test(fragment)
    const hasSingleQuotes = /^'|'$/g.test(fragment)
    const fragmentString = shouldRemoveColors ? cleanColors(fragment) : fragment

    return hasDoubleQuotes || hasSingleQuotes ? fragmentString : getQuotedString(fragmentString)
  })
}
