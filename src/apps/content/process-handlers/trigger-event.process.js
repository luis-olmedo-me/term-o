import { humanClick } from '@content/helpers/events.helpers'
import { domEventsAvailable } from '@src/constants/options.constants'
import { getElementByXPath } from '@src/helpers/dom-locator.helpers'
import { delay } from '@src/helpers/utils.helpers'
import { createHighlight } from '@src/helpers/web-components.helpers'

export default async (resolve, reject, data) => {
  const element = getElementByXPath(data.xpath)

  if (!element) return reject('XPath did not match any element.')

  if (data.event === domEventsAvailable.CLICK) {
    createHighlight({ element, theme: data.theme })
    await delay(100)
    humanClick(element)
  }

  resolve(null)
}
