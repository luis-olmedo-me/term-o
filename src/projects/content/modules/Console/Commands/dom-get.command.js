import { tryCatch } from './helpers/prevention.helpers'
import { historyTypes } from '../components/HistoryInterpreter/HistoryInterpreter.constants'
import { EASY_DOM_CONTENT_WRAPPER_ID } from 'projects/content/content.constants.js'

const callback = (searches) => {
  let elementsReached = ''

  if (searches) {
    const easyContainer = document.getElementById(EASY_DOM_CONTENT_WRAPPER_ID)
    const elementsFound = searches.reduce((found, search) => {
      const elementsFromQuery = tryCatch(() =>
        document.querySelectorAll(search)
      )
      const elements = elementsFromQuery ? Array.from(elementsFromQuery) : []
      const filteredElements = elements.filter(
        (element) => !easyContainer?.contains(element)
      )

      return elements ? [...found, ...filteredElements] : found
    }, [])

    elementsReached = elementsFound.reduce((reached, elementFound) => {
      const tagName = elementFound.tagName
      const id = elementFound.id ? `#${elementFound.id}` : ''
      const className = elementFound.className
        ? `.${elementFound.className}`
        : ''

      const label = `${tagName}${id || className}`

      return [
        ...reached,
        { label, value: elementFound, type: historyTypes.ELEMENT }
      ]
    }, [])
  }

  return elementsReached?.length
    ? elementsReached
    : [{ label: 'Error: DOM elements not Found', type: historyTypes.PLAIN }]
}

export const domGet = {
  'dom-get': {
    callback
  }
}
