const hasUniqueId = (element, allNodes) => {
  let uniqueIdCount = 0

  for (var nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
    const node = allNodes[nodeIndex]

    if (node.hasAttribute('id') && node.id == element.id) uniqueIdCount++

    if (uniqueIdCount > 1) break
  }

  return uniqueIdCount === 1
}

export const createXPathFromElement = (element) => {
  const allNodes = document.getElementsByTagName('*')
  const paths = []

  for (; element?.nodeType === 1; element = element.parentNode) {
    const localName = element.localName.toLowerCase()

    if (element.hasAttribute('id')) {
      const isUniqueId = hasUniqueId(element, allNodes)
      const id = element.getAttribute('id')

      if (isUniqueId) {
        paths.unshift(`id('${id}')`)

        return paths.join('/')
      } else {
        paths.unshift(`${localName}[@id='${id}']`)
      }
    } else if (element.hasAttribute('class')) {
      const className = element.getAttribute('class')

      paths.unshift(`${localName}[@class='${className}']`)
    } else {
      const index = getElementSiblingIndex(element)

      paths.unshift(`${localName}[${index}]`)
    }
  }

  return paths.length ? `/${paths.join('/')}` : null
}
