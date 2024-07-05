import { defaultTheme } from './theme.colors'

export const theme = pathsString => props => {
  const paths = pathsString.split('.')

  return paths.reduce((theme, path) => theme[path], props.theme)
}

export const getColor = color => {
  const colorLabel = defaultTheme.colors[color]

  return `[termo.${colorLabel || color}]`
}

export const isDarkModePrefered = () => {
  return Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
}
