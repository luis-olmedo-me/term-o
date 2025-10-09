export const theme = (pathsString, appendedString) => props => {
  const paths = pathsString.split('.')
  const value = paths.reduce((theme, path) => theme[path], props.theme)

  return appendedString ? `${value}${appendedString}` : value
}

export const getColor = color => {
  return `[termo.color.${color}]`
}

export const cleanColors = value => {
  const colorPattern = /\[termo\.color\.[A-Za-z]+\]|\[termo\.bgcolor\.[A-Za-z]+\]/g

  return value.replace(colorPattern, '')
}
