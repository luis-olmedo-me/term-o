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
