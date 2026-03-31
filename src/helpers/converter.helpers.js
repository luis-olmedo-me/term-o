import { isRgb, rgbToHex } from '@src/helpers/utils.helpers'
import { getElementXPath } from '../apps/content/helpers/dom-locator.helpers'

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
  let distanceY = 0

  if (rectA.right < rectB.left) {
    distanceX = rectB.left - rectA.right
  } else if (rectB.right <= rectA.left) {
    distanceX = rectA.left - rectB.right
  }

  if (rectA.bottom < rectB.top) {
    distanceY = rectB.top - rectA.bottom
  } else if (rectB.bottom <= rectA.top) {
    distanceY = rectA.top - rectB.bottom
  }

  return {
    distanceX,
    distanceY
  }
}
