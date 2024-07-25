import { getElementByXPath, getElementParent, getElementSibling } from './dom.helpers'

export const findDOMElement = async (resolve, data) => {
  const { searchByXpath, siblingIndex, parentIndex } = data

  const xpathElement = getElementByXPath(searchByXpath)
  if (!xpathElement) return resolve(null)

  const siblingElement = getElementSibling(xpathElement, siblingIndex)
  if (!siblingElement) return resolve(null)

  const element = getElementParent(siblingElement, parentIndex)
  if (!element) return resolve(null)

  const tagName = element.tagName.toLowerCase()
  const attrNames = element.getAttributeNames()

  const attrs = attrNames.reduce(
    (allAttrs, attrName) => ({ ...allAttrs, [attrName]: element.getAttribute(attrName) }),
    {}
  )

  resolve({ tagName, attributes: attrs, xpath: null, textContent: null })
}
