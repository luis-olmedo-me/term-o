import { getElementXPath } from './dom-locator.helpers'

export const convertElementToJSON = element => {
  const tagName = element.tagName.toLowerCase()
  const attrNames = element.getAttributeNames()
  const xpath = getElementXPath(element)
  const textContent = element.textContent

  const attrs = attrNames.map(attrName => [attrName, element.getAttribute(attrName)])

  return { tagName, attributes: attrs, xpath, textContent }
}
