import { getElementByXPath } from '@content/helpers/dom-locator.helpers'

export default async (resolve, reject, data) => {
  const { below, html } = data

  const element = getElementByXPath(below)

  if (!element) return reject('XPath did not match any element.')

  element.innerHTML = html

  resolve(null)
}
