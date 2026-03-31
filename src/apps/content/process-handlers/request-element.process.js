import { createElementPicker, createHighlight } from '@src/helpers/web-components.helpers'
import { convertElementToJSON } from '../helpers/format.helpers'

export default async (resolve, _reject, data) => {
  const elementPicker = createElementPicker()

  const handleMouseEnd = event => {
    const element = event.detail
    const elementAsJSON = convertElementToJSON(element)
    createHighlight({ element, theme: data.theme })

    elementPicker.remove()
    resolve(elementAsJSON)
  }

  elementPicker.addEventListener('pickedup', handleMouseEnd)
}
