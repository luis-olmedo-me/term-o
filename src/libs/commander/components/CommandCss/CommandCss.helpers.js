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

const getRules = (sheet) => {
  try {
    return sheet.rules || sheet.cssRules
  } catch {
    return null
  }
}
export const getStylesFrom = (element) => {
  const sheets = document.styleSheets,
    ret = []
  el.matches =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector ||
    el.oMatchesSelector

  for (const sheetId in sheets) {
    const rules = getRules(sheets[sheetId])

    for (const rule in rules) {
      if (el.matches(rules[rule].selectorText)) {
        ret.push(rules[rule].cssText)
      }
    }
  }

  return ret
}
