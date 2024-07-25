export const convertStringToObjects = input => {
  const colorPattern = /\[termo\.[A-Za-z]+\]/g
  const hasColors = colorPattern.test(input)

  if (!hasColors) return [{ color: null, content: input }]

  const contentFragments = input.split(colorPattern)
  const colorFragments = input.match(colorPattern) || []
  colorFragments.unshift('[termo.none]')

  return contentFragments.reduce((fragments, content, index) => {
    if (!content) return fragments
    const colorString = colorFragments[index]

    if (colorString === '[termo.none]') return [...fragments, { content, color: null }]
    const [, color] = colorString.match(/\[termo\.([A-Za-z]+)\]/)

    return [...fragments, { content, color }]
  }, [])
}
