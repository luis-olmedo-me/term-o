import { isRgb, rgbToHex } from '@src/helpers/utils.helpers'
import { getElementXPath } from './dom-locator.helpers'

export const convertElementToJSON = element => {
  const tagName = element.tagName.toLowerCase()
  const attrNames = element.getAttributeNames()
  const xpath = getElementXPath(element)
  const textContent = element.textContent

  const attrs = attrNames.map(attrName => [attrName, element.getAttribute(attrName)])

  return { tagName, attributes: attrs, xpath, textContent }
}

export const convertElementStylesToJSON = (element, styles) => {
  const tagName = element.tagName.toLowerCase()
  const stylesWithHexValues = styles.map(style => {
    const isRgbValue = isRgb(style.value)

    return isRgbValue ? { ...style, value: rgbToHex(style.value) } : style
  })

  return { tagName, styles: stylesWithHexValues }
}

export const convertElementsGapToJSON = (elementA, elementB) => {
  const rectA = elementA.getBoundingClientRect()
  const rectB = elementB.getBoundingClientRect()

  let distanceX = 0
  let directionX = null

  if (rectA.right < rectB.left) {
    distanceX = rectB.left - rectA.right
    directionX = 'right'
  } else if (rectB.right <= rectA.left) {
    distanceX = rectA.left - rectB.right
    directionX = 'left'
  }

  let distanceY = 0
  let directionY = null

  if (rectA.bottom < rectB.top) {
    distanceY = rectB.top - rectA.bottom
    directionY = 'down'
  } else if (rectB.bottom <= rectA.top) {
    distanceY = rectA.top - rectB.bottom
    directionY = 'up'
  }

  const centerA = {
    x: rectA.left + rectA.width / 2,
    y: rectA.top + rectA.height / 2
  }

  const centerB = {
    x: rectB.left + rectB.width / 2,
    y: rectB.top + rectB.height / 2
  }

  const deltaCenter = {
    x: centerB.x - centerA.x,
    y: centerB.y - centerA.y
  }

  const euclideanDistance = Math.hypot(deltaCenter.x, deltaCenter.y)

  return {
    distanceX,
    distanceY,
    directionX,
    directionY,
    deltaCenter,
    euclideanDistance,
    centers: { a: centerA, b: centerB },
    rects: { a: rectA, b: rectB }
  }
}
