import { camelize } from '../../commander.promises'
import { cssActionTypes } from './CommandCss.constants'

export const parseStyles = (inlineStyles) => {
  const regex = /([\w-]*)\s*:\s*([^;]*)/g
  var match,
    properties = {}

  while ((match = regex.exec(inlineStyles))) {
    const [, key, value] = match

    properties[camelize(key)] = value.trim()
  }

  return properties
}

export const parseManualStyles = (manualStyles) => {
  return Object.entries(manualStyles).reduce(
    (parsedManualStyles, [name, value]) => {
      return { ...parsedManualStyles, [name]: value }
    },
    {}
  )
}

export const getActionType = ({ styles, manualStyles, get }) => {
  const hasManualStyles = Object.keys(manualStyles).length

  if (styles || hasManualStyles) return cssActionTypes.SET_STYLES
  else if (get) return cssActionTypes.GET_STYLES
  else return cssActionTypes.NONE
}

const parseStringStyles = (stringStyles) => {
  return stringStyles.map((stringStyle) => {
    const startStylesIndex = stringStyle.indexOf('{')

    return {
      title: stringStyle.substring(0, startStylesIndex),
      style: stringStyle.substring(startStylesIndex + 1, stringStyle.length - 1)
    }
  })
}
const getRules = (sheet) => {
  try {
    return sheet.rules || sheet.cssRules
  } catch {
    console.log('not found')
    return null
  }
}
export const getStylesFrom = (element) => {
  const sheets = document.styleSheets
  let ret = []

  const matches =
    element.matches ||
    element.webkitMatchesSelector ||
    element.mozMatchesSelector ||
    element.msMatchesSelector ||
    element.oMatchesSelector

  for (const sheetId in sheets) {
    const rules = getRules(sheets[sheetId])

    if (rules === null) continue

    for (const rule in rules) {
      if (matches.apply(element, [rules[rule].selectorText])) {
        console.log('rules[rule]', rules[rule])
        ret = [...ret, rules[rule].cssText]
      }
    }
  }

  return parseStringStyles(ret)
}
