import { doubleQuotesPattern, singleQuotesPattern } from '@src/constants/patterns.constants'
import { getColor as C, cleanColors } from '@src/helpers/themes.helpers'
import { getOptionTypeLabel } from './options.helpers'
import { getQuotedString } from './utils.helpers'

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
  const highestTitleCount = command.get('highestTitleCount')
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

      const completeDescription = `${displayName} ${type} ${C`brightBlack`}${tab} ${C`reset`}${description}${C`reset`}`
      const quotedCompleteDescription = getQuotedString(completeDescription)

      helps.push([quotedCompleteDescription])
    })
  })

  command.log(...helps)
}

export const renderLine = segments => {
  return segments
    .flatMap(segment => {
      const isString = typeof segment === 'string'

      return !isString ? `[${renderOutput([segment])}]` : segment
    })
    .join(' ')
}

export const renderOutput = rawLines => {
  return rawLines.reduce((lines, segments) => {
    const line = renderLine(segments)

    return lines.concat(line)
  }, [])
}

export const flatLogs = logs => {
  const isArray = logs instanceof Array

  if (!isArray) return []

  return logs.map(logValue => {
    const isArray = logValue instanceof Array

    if (isArray) return flatLogs(logValue)
    const logValueNoColor = cleanColors(logValue)
    const hasSingleQuotes = singleQuotesPattern.test(logValueNoColor)
    const hasDoubleQuotes = doubleQuotesPattern.test(logValueNoColor)

    if (hasSingleQuotes) return logValueNoColor.replace(singleQuotesPattern, '')
    if (hasDoubleQuotes) return logValueNoColor.replace(doubleQuotesPattern, '')
    return parseInt(logValueNoColor)
  })
}

export const sanitizeLogs = logs => {
  return logs.reduce((result, logValue) => {
    const isArray = logValue instanceof Array

    if (isArray) {
      const recalledValue = sanitizeLogs(logValue)

      return result.concat(recalledValue)
    }

    const logValueAsString = String(logValue)

    return result.concat(logValueAsString)
  }, [])
}
