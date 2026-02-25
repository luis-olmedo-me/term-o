import { colorThemeKeys } from '@src/constants/themes.constants'
import { bothColored, nextColored, previousColored, uniqueColored } from './ColoredText.module.scss'

const colorPattern = /\[termo\.(color|bgcolor)\.([A-Za-z]+)\]/g

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

const getBorderClass = (fragments, index) => {
  const fragment = fragments[index]
  const previousFragment = fragments[index - 1]
  const nextFragment = findNextFragment(fragments, index)

  const isNextColored = isColoredFragment(nextFragment)
  const isPreviousColored = isColoredFragment(previousFragment)
  const isCurrentColored = isColoredFragment(fragment)

  if (isNextColored && !isPreviousColored) return nextColored
  if (isPreviousColored && !isNextColored) return previousColored
  if (isNextColored && isPreviousColored) return bothColored
  if (!isNextColored && !isPreviousColored && isCurrentColored) return uniqueColored
  return undefined
}

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
        color: null,
        bgcolor: null,
        isKeyword: true,
        borderClassName: null
      })
    }

    if (extraction) {
      results.push({
        value: extraction,
        color: lastColor,
        bgcolor: lastBGColor,
        isKeyword: false,
        borderClassName: null
      })
    }
  }

  return results.map((result, index) => ({
    ...result,
    borderClassName: getBorderClass(results, index)
  }))
}
