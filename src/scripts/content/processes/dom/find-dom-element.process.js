import { getElementByXPath, getElementSibling } from './dom.helpers'

export const findDOMElement = async (resolve, data) => {
  const { searchByXpath, siblingIndex } = data

  const mainElement = getElementByXPath(searchByXpath)

  if (!mainElement) return resolve(null)

  const element = getElementSibling(mainElement, siblingIndex)

  if (!element) return resolve(null)

  const tagName = element.tagName.toLowerCase()
  const attrNames = element.getAttributeNames()

  const attrs = attrNames.reduce(
    (allAttrs, attrName) => ({ ...allAttrs, [attrName]: element.getAttribute(attrName) }),
    {}
  )

  resolve({ tagName, attributes: attrs, xpath: null, textContent: null })
}
