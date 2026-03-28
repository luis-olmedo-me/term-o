import { createRuler } from '@src/helpers/web-components.helpers'

export default async resolve => {
  createRuler()

  const handleMouseEnd = e => {
    const allElements = document.elementsFromPoint(e.clientX, e.clientY)

    resolve(`Found elements: ${allElements.length}`)
  }

  document.addEventListener('click', handleMouseEnd)

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
