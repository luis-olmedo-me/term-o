let cachedURLs = {}
let cachedStyles = []
const getCrossOrginStyleSheet = async styleSheet => {
  const url = styleSheet.href
  const originalStyleElement = styleSheet.owner

  if (cachedURLs[url]) return cachedURLs[url]

  return await fetch(url)
    .then(response => response.text())
    .then(cssText => {
      const styleElement = document.createElement('style')

      styleElement.textContent = cssText

      if (originalStyleElement?.parentNode) {
        const parentNode = originalStyleElement.parentNode

        parentNode.insertBefore(styleElement, originalStyleElement)
      } else {
        document.head.appendChild(styleElement)
      }

      const myStyleSheet = document.styleSheets[document.styleSheets.length - 1]
      cachedURLs[url] = myStyleSheet
      cachedStyles.push(styleElement)

      return myStyleSheet
    })
}

export const clearMockedCrossOriginStyleSheets = () => {
  for (const cachedStyle of cachedStyles) {
    cachedStyle.remove()
  }

  cachedURLs = {}
}

export const mockCrossOriginStyleSheets = async () => {
  for (const styleSheet of document.styleSheets) {
    try {
      const isCrossOrigin = styleSheet.href
        ? new URL(styleSheet.href).orgin !== window.location.origin
        : false

      if (isCrossOrigin) await getCrossOrginStyleSheet(styleSheet)
    } catch {
      clearMockedCrossOriginStyleSheets()
      throw 'Unexpected error when trying to mock Cross Origin Stylesheet.'
    }
  }
}

const getStylesFromStyleAttribute = element => {
  const styleAttribute = element.getAttribute('style')

  if (!styleAttribute) return {}

  const declarations = styleAttribute.split(';')

  return declarations.reduce((styles, declaration) => {
    if (declaration.trim() === '') return styles

    const [property, value] = declaration.split(':').map(part => part.trim())
    styles[property] = value

    return { ...styles, [property]: value }
  }, {})
}

export const findCSSRuleForElement = (element, propertyName) => {
  const styleSheets = document.styleSheets
  const computedStyles = window.getComputedStyle(element)

  const inlineStyles = getStylesFromStyleAttribute(element)
  const isInlineStyle = propertyName in inlineStyles

  for (const styleSheet of styleSheets) {
    const isCrossOrigin = styleSheet.href
      ? new URL(styleSheet.href).orgin !== window.location.origin
      : false

    if (isCrossOrigin) continue

    const rules = styleSheet.cssRules || styleSheet.rules

    for (const rule of rules) {
      const isMatch = element.matches(rule.selectorText)

      if (!isMatch) continue
      const styleValue = rule.style[propertyName]
      const hasSamePropertyValue = styleValue === computedStyles.getPropertyValue(propertyName)

      if (hasSamePropertyValue) return rule.selectorText
    }
  }

  return isInlineStyle ? 'element.styles' : null
}

export const styleStringToArray = styleString => {
  return styleString.split(';').reduce(function(styleArray, style) {
    const parts = style.split(':')

    if (parts.length !== 2) return styleArray

    const key = parts[0]?.trim()
    const value = parts[1]?.trim()

    return key && value ? [...styleArray, [key, value]] : styleArray
  }, [])
}
