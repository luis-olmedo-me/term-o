import { createElementPicker, createRuler } from '@src/helpers/web-components.helpers'

export default async resolve => {
  createRuler()
  createElementPicker()

  const handleMouseEnd = event => {
    event.stopPropagation()
    const allElements = document.elementsFromPoint(event.clientX, event.clientY)

    document.removeEventListener('click', stopPropagation)
    document.removeEventListener('mousedown', handleMouseEnd)
    resolve(`Found elements: ${allElements.length}`)
  }
  const stopPropagation = event => event.stopPropagation()

  document.addEventListener('click', stopPropagation)
  document.addEventListener('mousedown', handleMouseEnd)

  // try {
  //   const requestEvent = new CustomEvent(eventNames.REQUEST_MEASURE_SEND)
  //   const handleRequestSolved = event => {
  //     window.removeEventListener(eventNames.REQUEST_MEASURE_SOLVED, handleRequestSolved)
  //     resolve(event.detail)
  //   }

  //   window.addEventListener(eventNames.REQUEST_MEASURE_SOLVED, handleRequestSolved)

  //   window.dispatchEvent(requestEvent)
  // } catch (error) {
  //   reject('Unexpected error when trying to request measure.')
  // }
}
