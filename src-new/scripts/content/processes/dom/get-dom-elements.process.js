export const getDOMElements = (resolve, data) => {
  const { searchByTag, searchByAttributeName } = data

  const tagPattern = searchByTag && new RegExp(searchByTag)
  const attrPattern = searchByAttributeName && new RegExp(searchByAttributeName)

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

    if (attrPattern) {
      conditions.push(() => {
        return attrNames.some(name => {
          const value = element.getAttribute(name)
          const attr = value ? `${name}="${value}"` : name

          return attrPattern.test(attr)
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
