import { getElementXPath } from './get-dom-elements.helpers'

export const getDOMElements = (resolve, data) => {
  const { searchByTag, searchByAttribute, searchByText, appendXpath } = data
  const [searchByAttributeName, searchByAttributeValue] = searchByAttribute

  const tagPattern = searchByTag && new RegExp(searchByTag)
  const textPattern = searchByText && new RegExp(searchByText)
  const attrNamePattern = searchByAttributeName && new RegExp(searchByAttributeName)
  const attrValuePattern = searchByAttributeValue && new RegExp(searchByAttributeValue)

  const allElements = window.document.querySelectorAll('*') || []

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

    if (!conditions.every(condition => condition())) return formattedElements

    const attrs = attrNames.reduce(
      (allAttrs, attrName) => ({ ...allAttrs, [attrName]: element.getAttribute(attrName) }),
      {}
    )
    const xpath = appendXpath ? getElementXPath(element) : null

    return [...formattedElements, { tagName, attributes: attrs, xpath }]
  }, [])

  resolve(elements)
}
