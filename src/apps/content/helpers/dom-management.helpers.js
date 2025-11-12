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

const mouseSvg = color => {
  const svg = `
    <svg width="18" height="30" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.7263 12.0862V15.6094H24.0001V7.95717C24.0001 2.85238 18.472 0.200976 12.7263 0V3.82821C13.322 3.98703 13.8492 4.3413 14.2258 4.83582C14.6024 5.33034 14.8072 5.93734 14.8083 6.56227V9.35213C14.8072 9.97705 14.6024 10.5841 14.2258 11.0786C13.8492 11.5731 13.322 11.9274 12.7263 12.0862Z"
        fill="${color}"
      />
      <path
        d="M0 7.95717V15.6094H11.2738V12.0862C10.6781 11.9274 10.1509 11.5731 9.77429 11.0786C9.39771 10.5841 9.19292 9.97705 9.19181 9.35213V6.56225C9.19292 5.93732 9.39772 5.33032 9.7743 4.83581C10.1509 4.34129 10.6781 3.98703 11.2738 3.82821V0C5.52812 0.200976 0 2.85238 0 7.95717Z"
        fill="${color}"
      />
      <path
        d="M0 23.8234C0 27.0528 1.26428 30.15 3.51472 32.4336C5.76516 34.7171 8.8174 36 12 36C15.1826 36 18.2348 34.7171 20.4853 32.4336C22.7357 30.15 24 27.0528 24 23.8234V17.1562H0V23.8234Z"
        fill="${color}"
      />
      <path
        d="M10.7205 6.53906V9.35157C10.7205 9.53624 10.7553 9.7191 10.8231 9.88972C10.8909 10.0603 10.9902 10.2154 11.1155 10.3459C11.2407 10.4765 11.3894 10.5801 11.553 10.6508C11.7167 10.7214 11.892 10.7578 12.0692 10.7578C12.2463 10.7578 12.4217 10.7214 12.5853 10.6508C12.7489 10.5801 12.8976 10.4765 13.0228 10.3459C13.1481 10.2154 13.2474 10.0603 13.3152 9.88972C13.383 9.7191 13.4179 9.53624 13.4179 9.35157V6.53906C13.4179 6.35439 13.383 6.17152 13.3152 6.00091C13.2474 5.8303 13.1481 5.67527 13.0228 5.54469C12.8976 5.41411 12.7489 5.31053 12.5853 5.23986C12.4217 5.16919 12.2463 5.13281 12.0692 5.13281C11.892 5.13281 11.7167 5.16919 11.553 5.23986C11.3894 5.31053 11.2407 5.41411 11.1155 5.54469C10.9902 5.67527 10.8909 5.8303 10.8231 6.00091C10.7553 6.17152 10.7205 6.35439 10.7205 6.53906Z"
        fill="${color}"
      />
    </svg>
  `

  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export const createOverlay = (message, theme, fontFamily) => {
  const overlay = document.createElement('div')
  const svgUrl = mouseSvg(theme[colorThemeKeys.FOREGROUND])

  overlay.style.position = 'fixed'
  overlay.style.display = 'flex'
  overlay.style.alignItems = 'center'
  overlay.style.justifyContent = 'center'
  overlay.style.cursor = `url(${svgUrl}) 6 28, crosshair`
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
