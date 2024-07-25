import {
  getElementByXPath,
  getElementChild,
  getElementParent,
  getElementSibling
} from './dom.helpers'

export const findDOMElement = async (resolve, data) => {
  const { searchByXpath, siblingIndex, parentIndex, childIndex } = data

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

  resolve({ tagName, attributes: attrs, xpath: null, textContent: null })
}
