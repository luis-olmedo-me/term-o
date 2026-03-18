import { getElementByXPath } from '@content/helpers/dom-locator.helpers'

export default async (resolve, reject, data) => {
  const { below, tagName } = data

  const targetElement = below ? getElementByXPath(below) : window.document

  if (!targetElement) return reject('XPath did not match any element.')
  const element = window.document.createElement(tagName)

  targetElement.appendChild(element)

  const tagNameTaken = element.tagName.toLowerCase()

  resolve({ tagName: tagNameTaken, attributes: [], xpath: null, textContent: null })
}
