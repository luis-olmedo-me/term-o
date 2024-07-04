export const getDOMElements = (resolve, data) => {
  const { searchByTag, searchByAttribute } = data
  const [searchByAttributeName, searchByAttributeValue] = searchByAttribute

  const tagPattern = searchByTag && new RegExp(searchByTag)
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

    if (attrNamePattern) {
      conditions.push(() => {
        return attrNames.some(name => attrNamePattern.test(name))
      })
    }

    if (attrValuePattern) {
      conditions.push(() => {
        return attrNames.some(name => {
          const value = element.getAttribute(name)

          return attrValuePattern.test(value)
        })
      })
    }

    if (!conditions.every(condition => condition())) return formattedElements

    const attrs = attrNames.reduce(
      (allAttrs, attrName) => ({ ...allAttrs, [attrName]: element.getAttribute(attrName) }),
      {}
    )
    return [...formattedElements, { tagName, attributes: attrs }]
  }, [])

  resolve(elements)
}
