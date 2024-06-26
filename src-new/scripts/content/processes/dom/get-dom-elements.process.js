export const getDOMElements = (resolve, data) => {
  const { searchByTag, searchByAttributeName, searchByAttributeValue } = data

  const tagPattern = searchByTag && new RegExp(searchByTag)
  const attrPattern = searchByAttributeName && new RegExp(searchByAttributeName)
  const attrValPattern = searchByAttributeValue && new RegExp(searchByAttributeValue)

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
        return attrNames.some(attrName => attrPattern.test(attrName))
      })
    }

    if (attrValPattern) {
      conditions.push(() => {
        return attrValues.some(attrValue => attrValPattern.test(attrValue))
      })
    }

    return conditions.every(condition => condition())
  })

  const formattedElements = elements.map(element => {
    const tagName = element.tagName.toLowerCase()
    const id = element.getAttribute('id')
    const classes = element.getAttribute('class')?.replaceAll(' ', '.')

    let label = tagName
    if (id) label = `${label}#${id}`
    if (classes && !id) label = `${label}.${classes}`

    return label
  })

  resolve(formattedElements)
}
