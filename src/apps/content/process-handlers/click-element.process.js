import { getElementByXPath } from '@content/helpers/dom-management.helpers'

export default async (resolve, reject, data) => {
  const { searchByXpath } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return reject('XPath did not match any element.')

  element.click()

  resolve({ name: 'click', target: searchByXpath })
}
