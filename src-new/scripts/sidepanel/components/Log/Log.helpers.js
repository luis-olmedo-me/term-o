export const convertStringToObjects = input => {
  const colorPattern = /\[termo\.#[0-9A-Fa-f]+\]/g
  const hasColors = colorPattern.test(input)

  if (!hasColors) return [{ color: null, content: input }]

  const contentFragments = input.split(colorPattern)
  const colorFragments = input.match(colorPattern) || []
  colorFragments.unshift('[termo.none]')

  return contentFragments.reduce((fragments, content, index) => {
    const colorString = colorFragments[index]

    if (colorString === '[termo.none]') return [...fragments, { content, color: null }]

    const [_match, color] = colorString.match(/#([0-9A-Fa-f]{6})/)

    return [...fragments, { content, color: `#${color}` }]
  }, [])
}
