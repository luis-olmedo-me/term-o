import colorSets from '@src/libs/color-sets'

export const theme = pathsString => props => {
  const paths = pathsString.split('.')

  return paths.reduce((theme, path) => theme[path], props.theme)
}

export const getColor = color => {
  const colorFound = colorSets.getColor(color)

  return `[termo.${colorFound || color}]`
}
