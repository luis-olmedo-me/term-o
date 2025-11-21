import { getElementByXPath } from '@content/helpers/dom-management.helpers'
import { highlightElement, humanClick } from '@content/pure-js'
import { eventsAvailable } from '@src/constants/options.constants'

export default async (resolve, reject, data) => {
  const element = getElementByXPath(data.xpath)

  if (!element) return reject('XPath did not match any element.')

  if (data.event === eventsAvailable.CLICK) {
    highlightElement(element, data.theme)
    humanClick(element)
  }

  resolve(null)
}
