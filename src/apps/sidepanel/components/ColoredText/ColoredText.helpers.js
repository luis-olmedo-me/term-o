import { getBgColor as BG, getColor as C } from '@src/helpers/themes.helpers'

const colorPattern = /\[termo\.color\.[A-Za-z]+\]/g
const bgColorPattern = /\[termo\.bgcolor\.[A-Za-z]+\]/g

export const getColoredSections = (input, carriedColorName) => {
  const startsWithColor = input.startsWith('[termo.color.')
  const hasColors = colorPattern.test(input)

  if (!hasColors) return [carriedColorName, [{ color: carriedColorName, content: input }]]
  let lastCarriedColorName = carriedColorName

  const lastColor = C(carriedColorName)
  const safeInput = startsWithColor ? input : `${lastColor}${input}`
  const contentFragments = safeInput.split(colorPattern).filter(Boolean)
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
  const contentFragments = safeInput.split(bgColorPattern).filter(Boolean)
  const bgColorFragments = safeInput.match(bgColorPattern) || []

  return contentFragments.reduce((fragments, content, index) => {
    const chosenColor = bgColorFragments[index]
    const [, key, bgcolor] = chosenColor.match(/\[termo\.(\w+)\.([A-Za-z]+)\]/)
    const [lastColorName, coloredSections] = getColoredSections(content, carriedColorName)

    carriedColorName = lastColorName

    return [...fragments, { content: coloredSections, bgcolor, key }]
  }, [])
}
