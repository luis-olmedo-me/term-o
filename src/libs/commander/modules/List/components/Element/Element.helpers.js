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
