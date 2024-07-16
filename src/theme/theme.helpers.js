import colorSet from '../libs/color-set'

export const theme = pathsString => props => {
  const paths = pathsString.split('.')

  return paths.reduce((theme, path) => theme[path], props.theme)
}

export const getColor = color => {
  const colorFound = colorSet.getColor(color)

  return `[termo.${colorFound || color}]`
}
