import { getBgColor as BG, getColor as C } from '@src/helpers/themes.helpers'
import { nextColored, previousColored, uniqueColored } from './ColoredText.module.scss'

const colorPattern = /\[termo\.color\.[A-Za-z]+\]/g
const bgColorPattern = /\[termo\.bgcolor\.[A-Za-z]+\]/g

const getColoredSections = (input, carriedColorName) => {
  let lastCarriedColorName = carriedColorName

  const lastColor = C(carriedColorName)
  const safeInput = `${lastColor}${input}`
  const [, ...contentFragments] = safeInput.split(colorPattern)
  const colorFragments = safeInput.match(colorPattern) || []

  const sections = contentFragments.reduce((fragments, content, index) => {
    const chosenColor = colorFragments[index]
    const [, key, color] = chosenColor.match(/\[termo\.(\w+)\.([A-Za-z]+)\]/)

    lastCarriedColorName = color

    return [...fragments, { content, color, key }]
  }, [])

  return [lastCarriedColorName, sections]
}

export const getBackgroundedSections = input => {
  let carriedColorName = 'reset'
  const hasBgColors = bgColorPattern.test(input)
  const hasColors = colorPattern.test(input)

  if (!hasBgColors && !hasColors)
    return [{ bgcolor: 'reset', content: [{ content: input, color: 'reset' }] }]

  const reset = BG`reset`
  const safeInput = `${reset}${input}`
  const [, ...contentFragments] = safeInput.split(bgColorPattern)
  const bgColorFragments = safeInput.match(bgColorPattern) || []

  return contentFragments.reduce((fragments, content, index) => {
    const chosenColor = bgColorFragments[index]
    const [, key, bgcolor] = chosenColor.match(/\[termo\.(\w+)\.([A-Za-z]+)\]/)
    const [lastColorName, coloredSections] = getColoredSections(content, carriedColorName)

    carriedColorName = lastColorName

    return [...fragments, { content: coloredSections, bgcolor, key }]
  }, [])
}

export const getBgBorderMod = (sections, sectionIndex) => {
  const nextSection = sections[sectionIndex + 1]
  const previousSection = sections[sectionIndex - 1]

  const isNextColored = !!nextSection && nextSection?.bgcolor !== 'reset'
  const isPreviousColored = !!previousSection && previousSection?.bgcolor !== 'reset'

  if (isNextColored && !isPreviousColored) return nextColored
  if (isPreviousColored && !isNextColored) return previousColored
  return uniqueColored
}
