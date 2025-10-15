import {
  getElementByXPath,
  getElementChild,
  getElementParent,
  getElementSibling,
  getElementXPath
} from '@content/helpers/dom-management.helpers'

export default async (resolve, data) => {
  const { searchByXpath, searchBelow, siblingIndex, parentIndex, childIndex, appendXpath } = data

  const elementBelow = searchBelow && getElementByXPath(searchBelow)

  const xpathElement = getElementByXPath(searchByXpath, elementBelow)
  if (!xpathElement) return resolve(null)

  const siblingElement = getElementSibling(xpathElement, siblingIndex)
  if (!siblingElement) return resolve(null)

  const parentElement = getElementParent(siblingElement, parentIndex)
  if (!parentElement) return resolve(null)

  const element = getElementChild(parentElement, childIndex)
  if (!element) return resolve(null)

  const tagName = element.tagName.toLowerCase()
  const attrNames = element.getAttributeNames()

  const attrs = attrNames.reduce(
    (allAttrs, attrName) => ({ ...allAttrs, [attrName]: element.getAttribute(attrName) }),
    {}
  )

  const xpath = appendXpath ? getElementXPath(element) : null

  resolve({ tagName, attributes: attrs, xpath, textContent: null })
}
