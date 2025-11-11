import { colorThemeKeys } from '@src/constants/themes.constants'

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

export const createOverlay = (message, theme, fontFamily) => {
  const overlay = document.createElement('div')

  overlay.style.position = 'fixed'
  overlay.style.display = 'flex'
  overlay.style.alignItems = 'center'
  overlay.style.justifyContent = 'center'
  overlay.style.cursor = 'crosshair'
  overlay.style.zIndex = '999999'
  overlay.style.fontSize = '18px'
  overlay.style.inset = '0'
  overlay.style.background = theme[colorThemeKeys.BACKGROUND]
  overlay.style.color = theme[colorThemeKeys.FOREGROUND]
  overlay.style.fontFamily = fontFamily
  overlay.textContent = message
  document.body.appendChild(overlay)

  return overlay
}
