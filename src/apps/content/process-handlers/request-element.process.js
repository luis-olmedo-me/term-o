import { getElementByXPath } from '@src/helpers/dom-locator.helpers'
import { createElementPicker, createHighlight } from '@src/helpers/web-components.helpers'

export default async (resolve, reject, data) => {
  const elementPicker = createElementPicker({ theme: data.theme })

  const handlePickUp = event => {
    const elementAsJSON = event.detail
    const element = getElementByXPath(elementAsJSON.xpath)
    createHighlight({ element, theme: data.theme })

    elementPicker.remove()
    resolve(elementAsJSON)
  }

  const handleCancel = () => {
    reject('Operation canceled by user')
  }

  elementPicker.addEventListener('pickedup', handlePickUp)
  elementPicker.addEventListener('cancel', handleCancel)
}
