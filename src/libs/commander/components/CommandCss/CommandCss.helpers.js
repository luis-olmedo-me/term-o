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
      const [lastValue] = value.reverse()

      return { ...parsedManualStyles, [name]: lastValue }
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
