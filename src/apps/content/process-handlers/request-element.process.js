import { createElementPicker, createRuler } from '@src/helpers/web-components.helpers'
import { convertElementToJSON } from '../helpers/format.helpers'

export default async resolve => {
  createRuler()
  const elementPicker = createElementPicker()

  const handleMouseEnd = event => {
    event.stopPropagation()
    const [, element] = document.elementsFromPoint(event.clientX, event.clientY)
    const elementAsJSON = convertElementToJSON(element)

    elementPicker.remove()
    resolve(elementAsJSON)
  }

  elementPicker.addEventListener('click', handleMouseEnd)
}
