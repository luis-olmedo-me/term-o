import { camelize } from '../../commander.promises'
import { cssActionTypes } from './CommandCss.constants'

export const parseStyles = (inlineStyles, formatter = camelize) => {
  const regex = /([\w-]*)\s*:\s*([^;]*)/g
  var match,
    properties = {}

  while ((match = regex.exec(inlineStyles))) {
    const [, key, value] = match
    const formattedKey = formatter ? formatter(key) : key

    properties[formattedKey] = value.trim()
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

const parseRules = (rules) => {
  return rules.map(({ cssText, selectorText }) => {
    const startStylesIndex = cssText.indexOf('{')
    const inlineStyles = cssText.substring(
      startStylesIndex + 1,
      cssText.length - 1
    )

    return {
      title: selectorText,
      styles: parseStyles(inlineStyles, null)
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
      const selectorText = rules[rule].selectorText
      const cssText = rules[rule].cssText

      if (matches.apply(element, [selectorText])) {
        ret = [{ cssText, selectorText }, ...ret]
      }
    }
  }

  const directInlineStylesApplied = element.getAttribute('style')
  const directStylesAppllied = parseStyles(directInlineStylesApplied, null)
  const directStylesWithSchema = directInlineStylesApplied
    ? [{ title: 'Styles', styles: directStylesAppllied }]
    : []

  return [...directStylesWithSchema, ...parseRules(ret)]
}
