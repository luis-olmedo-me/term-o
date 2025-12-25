import { onlyColorKeys } from '@src/constants/themes.constants'
import { toTitleCase } from './string.helpers'
import { getQuotedString } from './utils.helpers'

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

export const getAccentColors = (colorThemes, accentName) => {
  const accentNameTitleCase = toTitleCase(accentName)
  const brightAccentName = `bright${accentNameTitleCase}`

  const accent = colorThemes[accentName]
  const brightAccent = colorThemes[brightAccentName]

  return {
    accent: accent,
    brightAccent: brightAccent
  }
}

export const createAriaColorThemer = ({ theme }) => {
  return onlyColorKeys
    .map(color => `[aria-color="${color}"] { color: ${theme.colors[color]}; }`)
    .join('')
}

export const createAriaBgColorThemer = ({ theme }) => {
  return onlyColorKeys
    .map(color => `[aria-bg-color="${color}"] { background-color: ${theme.colors[color]}; }`)
    .join('')
}

const createVariablesFromTheme = (theme, pre = null) => {
  let variables = ''

  Object.entries(theme).forEach(([propName, propValue]) => {
    const name = pre ? `${pre}-${propName}` : propName
    const validValue = `${propValue}`

    if (typeof propValue === 'object') {
      variables += createVariablesFromTheme(propValue, name)
      return
    }

    const isHexColor = validValue.startsWith('#')
    const isMeasure = validValue.endsWith('px') || validValue.endsWith('rem')
    const value = isMeasure || isHexColor ? validValue : getQuotedString(validValue)

    variables += `--${name}: ${value}; `

    if (pre === 'colors' && isHexColor) {
      variables += `--${name}-30: ${value}30; `
      variables += `--${name}-40: ${value}40; `
      variables += `--${name}-CC: ${value}CC; `
    }
  })

  return variables
}

export const createRootVariablesFromTheme = theme => {
  return `:root { ${createVariablesFromTheme(theme)}}`
}
