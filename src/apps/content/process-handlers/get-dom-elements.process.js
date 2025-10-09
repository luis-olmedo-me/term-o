import { getElementByXPath, getElementXPath } from '@content/helpers/dom-management.helpers'

export const getDOMElements = async (resolve, data) => {
  const {
    searchBelow,
    searchByTag,
    searchByAttribute,
    searchByStyle,
    searchByText,
    appendXpath,
    appendTextContent
  } = data
  const [searchByAttributeName, searchByAttributeValue] = searchByAttribute
  const [searchByStyleName, searchByStyleValue] = searchByStyle

  const tagPattern = searchByTag && new RegExp(searchByTag)
  const textPattern = searchByText && new RegExp(searchByText)
  const attrNamePattern = searchByAttributeName && new RegExp(searchByAttributeName)
  const attrValuePattern = searchByAttributeValue && new RegExp(searchByAttributeValue)
  const styleNamePattern = searchByStyleName && new RegExp(searchByStyleName)
  const styleValuePattern = searchByStyleValue && new RegExp(searchByStyleValue)

  const below = searchBelow && getElementByXPath(searchBelow)
  const allElements = (below || window.document).querySelectorAll('*') || []

  const elements = Array.from(allElements).reduce((formattedElements, element) => {
    const tagName = element.tagName.toLowerCase()
    const attrNames = element.getAttributeNames()

    const conditions = []

    if (tagPattern) {
      conditions.push(() => {
        return tagPattern.test(tagName)
      })
    }

    if (textPattern) {
      conditions.push(() => {
        return textPattern.test(element.textContent)
      })
    }

    if (attrNamePattern || attrValuePattern) {
      conditions.push(() => {
        return attrNames.some(name => {
          const value = element.getAttribute(name)
          const isNameMatch = !attrNamePattern || attrNamePattern.test(name)
          const isValueMatch = !attrValuePattern || attrValuePattern.test(value)

          return isNameMatch && isValueMatch
        })
      })
    }

    if (styleNamePattern || styleValuePattern) {
      conditions.push(() => {
        const computedStyles = getComputedStyle(element)

        for (let i = 0; i < computedStyles.length; i++) {
          const propName = computedStyles[i]
          const propValue = computedStyles.getPropertyValue(propName)

          const isNameMatch = !styleNamePattern || styleNamePattern.test(propName)
          const isValueMatch = !styleValuePattern || styleValuePattern.test(propValue)

          if (isNameMatch && isValueMatch) return true
        }

        return false
      })
    }

    if (!conditions.every(condition => condition())) return formattedElements

    const attrs = attrNames.reduce(
      (allAttrs, attrName) => ({ ...allAttrs, [attrName]: element.getAttribute(attrName) }),
      {}
    )
    const xpath = appendXpath ? getElementXPath(element) : null

    const textContent = appendTextContent ? element.textContent : null

    return [...formattedElements, { tagName, attributes: attrs, xpath, textContent }]
  }, [])

  resolve(elements)
}
