import { getElementByXPath, highlightElement } from '@content/helpers/dom-management.helpers'
import { eventsAvailable } from '@src/constants/options.constants'

export default async (resolve, reject, data) => {
  const element = getElementByXPath(data.xpath)

  if (!element) return reject('XPath did not match any element.')

  if (data.event === eventsAvailable.CLICK) {
    await highlightElement(element, 600)
    // humanClick(element)
  }

  resolve(null)
}
