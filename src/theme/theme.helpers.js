import themer from '@src/libs/themer'

export const theme = pathsString => props => {
  const paths = pathsString.split('.')

  return paths.reduce((theme, path) => theme[path], props.theme)
}

export const getColor = color => {
  const colorFound = themer.getColor(color)

  return `[termo.${colorFound || color}]`
}
