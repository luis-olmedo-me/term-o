import { checkIfRegExpIsValid } from './utils.helpers'

export const isElementHidden = (element, bounds) => {
  const { height, width } = bounds || element.getBoundingClientRect()

  return (
    element.style.visibility === 'hidden' ||
    element.style.display === 'none' ||
    height === 0 ||
    width === 0
  )
}

export const isObjectFilterValidRegex = filter => {
  return Object.entries(filter).every(([key, value]) => {
    return checkIfRegExpIsValid(key) && checkIfRegExpIsValid(value)
  })
}

export const getAttributes = element => {
  const attributeNames = element.getAttributeNames(element)

  return attributeNames.reduce((allAttributes, attributeName) => {
    return {
      ...allAttributes,
      [attributeName]: element.getAttribute(attributeName)
    }
  }, {})
}

export const getStyles = element => {
  const styleNames = Object.keys(element.style)
  const computedStyles = getComputedStyle(element)

  return styleNames.reduce((allStyles, styleName) => {
    const styleValue = computedStyles.getPropertyValue(styleName)

    return styleValue
      ? {
          ...allStyles,
          [styleName]: styleValue
        }
      : allStyles
  }, {})
}

export const runWebsource = fileName => {
  const scriptElement = document.createElement('script')
  scriptElement.src = chrome.runtime.getURL(fileName)
  scriptElement.onload = function() {
    this.remove()
  }

  if (document.head) document.head.appendChild(scriptElement)
  else document.documentElement.appendChild(scriptElement)
}
