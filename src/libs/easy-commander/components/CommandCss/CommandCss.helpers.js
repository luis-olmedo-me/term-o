import { camelize } from '../../easyCommander.promises'

const parseStyleElement = (inlineStyles) => {
  const regex = /([\w-]*)\s*:\s*([^;]*)/g
  var match,
    properties = {}

  while ((match = regex.exec(inlineStyles))) {
    const [, key, value] = match

    properties[camelize(key)] = value.trim()
  }

  return properties
}

export const parseStyles = (inlineStyles) => {
  return inlineStyles.reduce((parsedStyles, inlineStyle) => {
    const styleElement = parseStyleElement(inlineStyle)

    return {
      ...parsedStyles,
      ...styleElement
    }
  }, {})
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
