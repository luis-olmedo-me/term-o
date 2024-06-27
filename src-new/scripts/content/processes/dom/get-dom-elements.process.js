export const getDOMElements = (resolve, data) => {
  const { searchByTag, searchByAttributeName } = data

  const tagPattern = searchByTag && new RegExp(searchByTag)
  const attrPattern = searchByAttributeName && new RegExp(searchByAttributeName)

  const elementsFromDOM = window.document.querySelectorAll('*') || []
  const elements = Array.from(elementsFromDOM).filter(element => {
    const tagName = element.tagName.toLowerCase()
    const attrNames = element.getAttributeNames()
    const attrValues = attrNames.map(attributeName => element.getAttribute(attributeName))

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
          const attr = value ? `${name}=${value}` : name

          return attrPattern.test(attr)
        })
      })
    }

    return conditions.every(condition => condition())
  })

  const formattedElements = elements.map(element => {
    const tagName = element.tagName.toLowerCase()
    const attrNames = element.getAttributeNames() || []
    const attrs = attrNames.reduce(
      (allAttrs, attrName) => ({ ...allAttrs, [attrName]: element.getAttribute(attrName) }),
      {}
    )

    return { tagName, attributes: attrs }
  })

  resolve(formattedElements)
}
