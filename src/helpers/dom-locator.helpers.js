export const getElementXPath = element => {
  if (element.id) return `//*[@id="${element.id}"]`
  if (!element.parentElement) return element.tagName.toLowerCase()

  const siblings = element.parentNode.children
  let index = 0
  let count = 0

  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i]

    if (sibling.tagName === element.tagName) {
      count++
      if (sibling === element) {
        index = count
      }
    }
  }

  const tag = element.tagName.toLowerCase()

  const isSVG = element.namespaceURI === 'http://www.w3.org/2000/svg'
  const segment = isSVG ? `*[local-name()="${tag}"][${index}]` : `${tag}[${index}]`

  return `${getElementXPath(element.parentElement)}/${segment}`
}

export const getElementByXPath = (xpath, below) => {
  return (below || window.document).evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue
}

export const getElementSibling = (element, siblingIndex) => {
  if (!siblingIndex) return element

  const isBelow = siblingIndex > 0
  const step = isBelow ? 1 : -1

  let foundSibling = element

  for (let index = 0; index !== siblingIndex; index += step) {
    foundSibling = isBelow ? foundSibling.nextSibling : foundSibling.previousSibling

    if (foundSibling === null) break
  }

  return foundSibling
}

export const getElementParent = (element, parentIndex) => {
  if (!parentIndex) return element

  let foundParent = element

  for (let index = 0; index !== parentIndex; index++) {
    foundParent = foundParent.parentElement

    if (foundParent === null) break
  }

  return foundParent
}

export const getElementChild = (element, childIndex) => {
  if (!childIndex) return element

  return element.children.item(childIndex)
}
