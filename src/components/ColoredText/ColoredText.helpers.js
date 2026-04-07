import { paintedBorderTypes } from '@src/constants/paint.constants'
import { colorPattern } from '@src/constants/patterns.constants'
import { colorThemeKeys } from '@src/constants/themes.constants'
import {
  text___both_colored,
  text___next_colored,
  text___previous_colored,
  text___unique_colored
} from './ColoredText.module.scss'

const isColoredFragment = fragment => {
  return (
    !!fragment &&
    !!fragment.value &&
    !!fragment.bgcolor &&
    fragment.bgcolor !== colorThemeKeys.RESET
  )
}

const findNextFragment = (fragments, currentIndex) => {
  const currentFragment = fragments[currentIndex]
  const nextFragmentPossibleIndex = currentIndex + 1

  if (!currentFragment.isKeyword) return fragments[nextFragmentPossibleIndex]

  for (let index = nextFragmentPossibleIndex; index < fragments.length; index++) {
    const fragment = fragments[index]

    if (!fragment) return null
    if (fragment.isKeyword) continue
    return fragment
  }

  return null
}

const getBorderType = (fragments, index) => {
  const fragment = fragments[index]
  const previousFragment = fragments[index - 1]
  const nextFragment = findNextFragment(fragments, index)

  const isNextColored = isColoredFragment(nextFragment)
  const isPreviousColored = isColoredFragment(previousFragment)
  const isCurrentColored = isColoredFragment(fragment)

  if (isNextColored && !isPreviousColored) return paintedBorderTypes.BOTH_COLORED
  if (isPreviousColored && !isNextColored) return paintedBorderTypes.PREVIOUS_COLORED
  if (isNextColored && isPreviousColored) return paintedBorderTypes.NEXT_COLORED
  if (!isNextColored && !isPreviousColored && isCurrentColored)
    return paintedBorderTypes.UNIQUE_COLORED
  return ''
}

export const getPaintedFragments = (value, keywordsEnabled) => {
  const matches = value.matchAll(colorPattern)?.toArray() || []
  const firstMatch = matches.at(0)
  let results = []
  let lastColor = colorThemeKeys.RESET
  let lastBGColor = colorThemeKeys.RESET

  if (!firstMatch || firstMatch.index > 0) {
    const start = firstMatch?.index
    const extraction = start ? value.slice(0, start) : value.slice(0)

    results.push({
      value: extraction,
      color: lastColor,
      bgcolor: lastBGColor,
      isKeyword: false,
      borderType: null
    })
  }

  for (let index = 0; index < matches.length; index++) {
    const match = matches[index]
    const matchValue = match.at(0)
    const category = match.at(1)
    const color = match.at(2)

    const nextMatch = matches[index + 1]

    const start = match.index + matchValue.length
    const extraction = nextMatch ? value.slice(start, nextMatch.index) : value.slice(start)

    const isColorKey = category === 'fg'

    if (isColorKey) lastColor = color
    else lastBGColor = color

    if (keywordsEnabled) {
      results.push({
        value: matchValue,
        color: null,
        bgcolor: null,
        isKeyword: true,
        borderType: null
      })
    }

    if (extraction) {
      results.push({
        value: extraction,
        color: lastColor,
        bgcolor: lastBGColor,
        isKeyword: false,
        borderType: null
      })
    }
  }

  return results.map((result, index) => ({
    ...result,
    borderType: getBorderType(results, index)
  }))
}

export const getClassByBorderType = borderType => {
  if (borderType === paintedBorderTypes.BOTH_COLORED) return text___both_colored
  if (borderType === paintedBorderTypes.PREVIOUS_COLORED) return text___previous_colored
  if (borderType === paintedBorderTypes.NEXT_COLORED) return text___next_colored
  if (borderType === paintedBorderTypes.UNIQUE_COLORED) return text___unique_colored
  return ''
}
