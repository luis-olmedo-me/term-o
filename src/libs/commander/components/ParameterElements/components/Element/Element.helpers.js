const hasUniqueId = (element, allNodes) => {
  let uniqueIdCount = 0

  for (var nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
    const node = allNodes[nodeIndex]

    if (node.hasAttribute('id') && node.id == element.id) uniqueIdCount++

    if (uniqueIdCount > 1) break
  }

  return uniqueIdCount === 1
}

const getElementSiblingIndex = (element) => {
  let index = 1

  for (
    let previousSibling = element.previousSibling;
    previousSibling;
    previousSibling = previousSibling.previousSibling
  ) {
    if (previousSibling.localName == element.localName) index++
  }

  return index
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
        paths.unshift(`id("${id}")`)

        return paths.join('/')
      } else {
        paths.unshift(`${localName}[@id="${id}"]`)
      }
    } else if (element.hasAttribute('class')) {
      const className = element.getAttribute('class')

      paths.unshift(`${localName}[@class="${className}"]`)
    } else {
      const index = getElementSiblingIndex(element)

      paths.unshift(`${localName}[${index}]`)
    }
  }

  return paths.length ? `/${paths.join('/')}` : null
}
