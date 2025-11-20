import { getElementByXPath, humanClick } from '@content/helpers/dom-management.helpers'

export default async (resolve, reject, data) => {
  const element = getElementByXPath(data.xpath)

  if (!element) return reject('XPath did not match any element.')

  humanClick(element)

  resolve(null)
}
