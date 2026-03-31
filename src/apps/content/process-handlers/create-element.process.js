import { getElementByXPath } from '@content/helpers/dom-locator.helpers'
import { convertElementToJSON } from '@src/helpers/converter.helpers'

export default async (resolve, reject, data) => {
  const { below, tagName, attributes } = data

  const targetElement = below ? getElementByXPath(below) : window.document.body

  if (!targetElement) return reject('XPath did not match any element as a target.')
  const element = window.document.createElement(tagName)

  attributes.forEach(([name, value]) => {
    element.setAttribute(name, value)
  })

  targetElement.appendChild(element)

  const elementAsJSON = convertElementToJSON(element)

  resolve(elementAsJSON)
}
