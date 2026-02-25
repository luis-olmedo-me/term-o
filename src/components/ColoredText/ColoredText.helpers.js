import { colorThemeKeys } from '@src/constants/themes.constants'
import { bothColored, nextColored, previousColored, uniqueColored } from './ColoredText.module.scss'

const colorPattern = /\[termo\.(color|bgcolor)\.([A-Za-z]+)\]/g

export const getPaintedFragments = (value, keywordsEnabled) => {
  const matches = value.matchAll(colorPattern)?.toArray() || []
  let results = []
  let lastColor = colorThemeKeys.RESET
  let lastBGColor = colorThemeKeys.RESET

  for (let index = 0; index < matches.length; index++) {
    const match = matches[index]
    const matchValue = match.at(0)
    const category = match.at(1)
    const color = match.at(2)

    const nextMatch = matches[index + 1]

    const start = match.index + matchValue.length
    const extraction = nextMatch ? value.slice(start, nextMatch.index) : value.slice(start)

    const isColorKey = category === 'color'

    if (isColorKey) lastColor = color
    else lastBGColor = color

    if (keywordsEnabled) {
      results.push({
        value: matchValue,
        color: colorThemeKeys.BRIGHT_BLACK,
        bgcolor: colorThemeKeys.RESET,
        isKeyword: true
      })
    }

    if (extraction) {
      results.push({
        value: extraction,
        color: lastColor,
        bgcolor: lastBGColor,
        isKeyword: false
      })
    }
  }

  return results
}

const isColoredFragment = fragment => {
  return !!fragment && !!fragment.value && fragment.bgcolor !== colorThemeKeys.RESET
}

export const getBorderClass = (fragments, index) => {
  const nextFragment = fragments[index + 1]
  const previousFragment = fragments[index - 1]
  const currentFragment = fragments[index]

  const isNextColored = isColoredFragment(nextFragment)
  const isPreviousColored = isColoredFragment(previousFragment)
  const isCurrentColored = isColoredFragment(currentFragment)

  if (isNextColored && !isPreviousColored) return nextColored
  if (isPreviousColored && !isNextColored) return previousColored
  if (isNextColored && isPreviousColored) return bothColored
  if (!isNextColored && !isPreviousColored && isCurrentColored) return uniqueColored
  return undefined
}
