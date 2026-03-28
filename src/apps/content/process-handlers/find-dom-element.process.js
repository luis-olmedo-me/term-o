import {
  getElementByXPath,
  getElementChild,
  getElementParent,
  getElementSibling
} from '@content/helpers/dom-locator.helpers'
import { convertElementToJSON } from '@content/helpers/format.helpers'

export default async (resolve, reject, data) => {
  const { searchByXpath, searchBelow, siblingIndex, parentIndex, childIndex } = data

  const elementBelow = searchBelow && getElementByXPath(searchBelow)

  const xpathElement = getElementByXPath(searchByXpath, elementBelow)
  if (!xpathElement) return reject('XPath did not match any element.')

  const siblingElement = getElementSibling(xpathElement, siblingIndex)
  if (!siblingElement) return reject('Sibling index did not match any element.')

  const parentElement = getElementParent(siblingElement, parentIndex)
  if (!parentElement) return reject('Parent index did not match any element.')

  const element = getElementChild(parentElement, childIndex)
  if (!element) return reject('Child index did not match any element.')

  const elementAsJSON = convertElementToJSON(element)
  resolve(elementAsJSON)
}
