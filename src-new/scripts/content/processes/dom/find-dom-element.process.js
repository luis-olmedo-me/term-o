import { getElementByXPath } from './dom.helpers'

export const findDOMElement = (resolve, data) => {
  const { searchByXpath } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return resolve(null)

  const tagName = element.tagName.toLowerCase()
  const attrNames = element.getAttributeNames()

  const attrs = attrNames.reduce(
    (allAttrs, attrName) => ({ ...allAttrs, [attrName]: element.getAttribute(attrName) }),
    {}
  )

  resolve({ tagName, attributes: attrs })
}
