export const getElementXPath = element => {
  if (element.id !== '') return 'id("' + element.id + '")'
  if (element.parentElement === null) return element.tagName.toLowerCase()

  let childCount = 0
  let siblings = element.parentNode.childNodes

  for (let i = 0; i < siblings.length; i++) {
    let sibling = siblings[i]

    if (sibling === element)
      return (
        getElementXPath(element.parentNode) +
        '/' +
        element.tagName.toLowerCase() +
        '[' +
        (childCount + 1) +
        ']'
      )

    if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === element.tagName) {
      childCount++
    }
  }

  return ''
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

export const humanClick = element => {
  const rect = element.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2

  const events = ['mouseover', 'mousemove', 'mousedown', 'mouseup', 'click']

  for (const type of events) {
    const evt = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
      screenX: x,
      screenY: y
    })

    element.dispatchEvent(evt)
  }
}
