import {
  getElementByXPath,
  getElementChild,
  getElementParent,
  getElementSibling,
  getElementXPath
} from './dom.helpers'

export const findDOMElement = async (resolve, data) => {
  const { searchByXpath, siblingIndex, parentIndex, childIndex, appendXpath } = data

  const xpathElement = getElementByXPath(searchByXpath)
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
