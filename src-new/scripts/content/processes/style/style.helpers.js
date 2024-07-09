let cachedURLs = {}
const getCrossOrginStyleSheet = async url => {
  if (cachedURLs[url]) return cachedURLs[url]

  return await fetch(url)
    .then(response => response.text())
    .then(cssText => {
      const styleElement = document.createElement('style')

      styleElement.textContent = cssText

      document.head.appendChild(styleElement)

      const myStyleSheet = document.styleSheets[document.styleSheets.length - 1]
      cachedURLs[url] = myStyleSheet

      return myStyleSheet
    })
}

export async function findCSSRuleForElement(element, propertyName) {
  const styleSheets = document.styleSheets
  const computedStyles = window.getComputedStyle(element)

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

  return null
}

export const mockCrossOriginStyleSheets = async () => {
  for (const styleSheet of document.styleSheets) {
    try {
      const isCrossOrigin = styleSheet.href
        ? new URL(styleSheet.href).orgin !== window.location.origin
        : false

      if (isCrossOrigin) await getCrossOrginStyleSheet(styleSheet.href)
    } catch {
      throw new Error('Unexpected error when trying to mock Cross Origin Stylesheet.')
    }
  }
}
