import { getElementByXPath } from '@src/helpers/dom-locator.helpers'
import { createElementPicker, createHighlight } from '@src/helpers/web-components.helpers'

export default async (resolve, _reject, data) => {
  const elementPicker = createElementPicker({ theme: data.theme })

  const handleMouseEnd = event => {
    const elementAsJSON = event.detail
    const element = getElementByXPath(elementAsJSON.xpath)
    createHighlight({ element, theme: data.theme })

    elementPicker.remove()
    resolve(elementAsJSON)
  }

  elementPicker.addEventListener('pickedup', handleMouseEnd)
}
