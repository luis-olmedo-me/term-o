import { backgroundLogo, rotationValues } from '@src/constants/string-svg.constants'
import { toTitleCase } from './string.helpers'
import { getQuotedString } from './utils.helpers'

export const getColor = color => {
  return `{tfg:${color}}`
}

export const getBgColor = color => {
  return `{tbg:${color}}`
}

export const cleanColors = value => {
  const colorPattern = /\{tfg:[A-Za-z]+\}|\{tbg:[A-Za-z]+\}/g

  return value.replace(colorPattern, '')
}

export const escapeColors = (value = '') => {
  const colorPattern = /\{tfg:[A-Za-z]+\}|\{tbg:[A-Za-z]+\}/g

  return value.replace(colorPattern, character => RegExp.escape(character))
}

export const getAccentColors = (colorThemes, accentName) => {
  const accentNameTitleCase = toTitleCase(accentName)
  const brightAccentName = `bright${accentNameTitleCase}`

  const accent = colorThemes[accentName]
  const brightAccent = colorThemes[brightAccentName]

  return { accent, brightAccent }
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
  })

  return variables
}

export const createCssVariablesFromTheme = (theme, selector = ':root') => {
  return `${selector} { ${createVariablesFromTheme(theme)}}`
}

export const createImageVariablesFromTheme = theme => {
  const components = rotationValues.map(rotation => {
    return backgroundLogo
      .replace('{brightWhite}', theme.colors.brightWhite)
      .replace('{brightWhite}', theme.colors.brightWhite)
      .replace('{brightAccent}', theme.colors.brightAccent)
      .replace('{brightBlack}', theme.colors.brightBlack)
      .replace('{rotation}', rotation)
      .replace('{opacity}', theme.isDarkMode ? 0.02 : 0.075)
  })

  const urls = components.map(
    component => `url("data:image/svg+xml,${encodeURIComponent(component)}")`
  )

  return `:root { ${urls.map((url, level) => `--url-${level}00: ${url};`).join('')} }`
}
