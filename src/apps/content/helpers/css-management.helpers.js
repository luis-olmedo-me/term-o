export const styleStringToArray = styleString => {
  return styleString.split(';').reduce(function (styleArray, style) {
    const parts = style.split(':')

    if (parts.length !== 2) return styleArray

    const key = parts[0]?.trim()
    const value = parts[1]?.trim()

    return key && value ? [...styleArray, [key, value]] : styleArray
  }, [])
}

export const getNonDefaultComputedStyles = element => {
  const differences = []
  const computedStyles = window.getComputedStyle(element)
  const defaultElement = document.createElement(element.tagName)
  const defaults = window.getComputedStyle(defaultElement)

  document.body.appendChild(defaultElement)

  for (let i = 0; i < computedStyles.length; i++) {
    const prop = computedStyles[i]
    const value = computedStyles.getPropertyValue(prop)
    const defaultValue = defaults.getPropertyValue(prop)

    if (value !== defaultValue) {
      differences.push({ prop, value })
    }
  }

  document.body.removeChild(defaultElement)

  return differences
}
