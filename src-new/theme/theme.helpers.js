import { defaultTheme, themeColorSetNameRef } from './theme.colors'

export const theme = pathsString => props => {
  const paths = pathsString.split('.')

  return paths.reduce((theme, path) => theme[path], props.theme)
}

export const getColor = color => {
  const colorSetName = themeColorSetNameRef.current
  const colorSet = defaultTheme.colorsets.find(set => set.name === colorSetName) || {}

  return `[termo.${colorSet[color] || color}]`
}
