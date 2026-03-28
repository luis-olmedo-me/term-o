import { createElementPicker, createRuler } from '@src/helpers/web-components.helpers'

export default async resolve => {
  createRuler()
  const elementPicker = createElementPicker()

  const handleMouseEnd = event => {
    event.stopPropagation()
    const [, element] = document.elementsFromPoint(event.clientX, event.clientY)
    const attrs = element.getAttributeNames().map(name => [name, element.getAttribute(name)])

    elementPicker.remove()
    resolve(`Found elements: ${element.tagName} ${JSON.stringify(attrs)}`)
  }

  elementPicker.addEventListener('click', handleMouseEnd)
}
