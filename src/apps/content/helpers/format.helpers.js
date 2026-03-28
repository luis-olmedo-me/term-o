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
