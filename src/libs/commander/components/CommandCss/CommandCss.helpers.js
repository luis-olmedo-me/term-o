import { camelize } from '../../commander.promises'
import { actionTypes } from '../../constants/commands.constants'

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

export const getActionType = ({ styles, manualStyles }) => {
  if (styles) return actionTypes.SET_STYLES
  else if (Object.keys(manualStyles).length) return actionTypes.SET_STYLES
  else return actionTypes.NONE
}
