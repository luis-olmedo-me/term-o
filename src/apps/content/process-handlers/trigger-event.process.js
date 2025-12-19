import { getElementByXPath } from '@content/helpers/dom-locator.helpers'
import { humanClick } from '@content/helpers/events.helpers'
import { eventsAvailable } from '@src/constants/options.constants'
import { delay } from '@src/helpers/utils.helpers'
import { createHighlight } from '@src/helpers/web-components.helpers'

export default async (resolve, reject, data) => {
  const element = getElementByXPath(data.xpath)

  if (!element) return reject('XPath did not match any element.')

  if (data.event === eventsAvailable.CLICK) {
    createHighlight({ element, theme: data.theme })
    await delay(100)
    humanClick(element)
  }

  resolve(null)
}
