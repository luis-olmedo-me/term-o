import {
  getElementByXPath,
  getElementChild,
  getElementParent,
  getElementSibling,
  getElementXPath
} from '@src/apps/content/helpers/dom-locator.helpers'

export default async (resolve, reject, data) => {
  const { searchByXpath, searchBelow, siblingIndex, parentIndex, childIndex, appendXpath } = data

  const elementBelow = searchBelow && getElementByXPath(searchBelow)

  const xpathElement = getElementByXPath(searchByXpath, elementBelow)
  if (!xpathElement) return reject('XPath did not match any element.')

  const siblingElement = getElementSibling(xpathElement, siblingIndex)
  if (!siblingElement) return reject('Sibling index did not match any element.')

  const parentElement = getElementParent(siblingElement, parentIndex)
  if (!parentElement) return reject('Parent index did not match any element.')

  const element = getElementChild(parentElement, childIndex)
  if (!element) return reject('Child index did not match any element.')

  const tagName = element.tagName.toLowerCase()
  const attrNames = element.getAttributeNames()

  const attrs = attrNames.reduce(
    (allAttrs, attrName) => ({ ...allAttrs, [attrName]: element.getAttribute(attrName) }),
    {}
  )

  const xpath = appendXpath ? getElementXPath(element) : null

  resolve({ tagName, attributes: attrs, xpath, textContent: null })
}
