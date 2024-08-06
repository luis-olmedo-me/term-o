export const convertStringToObjects = input => {
  const colorPattern = /\[termo\.color\.[A-Za-z]+\]|\[termo\.bgcolor\.[A-Za-z]+\]/g
  const hasColors = colorPattern.test(input)

  if (!hasColors) return [{ color: null, content: input }]

  const contentFragments = input.split(colorPattern)
  const colorFragments = input.match(colorPattern) || []
  colorFragments.unshift('[termo.color.none]')

  return contentFragments.reduce((fragments, content, index) => {
    if (!content) return fragments
    const colorString = colorFragments[index]

    if (colorString === '[termo.color.none]') return [...fragments, { content, color: null }]
    if (colorString === '[termo.bgcolor.none]') return [...fragments, { content, bgcolor: null }]
    const [, key, color] = colorString.match(/\[termo\.(\w+)\.([A-Za-z]+)\]/)

    return [...fragments, { content, [key]: color }]
  }, [])
}
