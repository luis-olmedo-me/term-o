import { domMessages } from './CommandDom.messages'

const getElementsFromDOM = (patterns) => {
  try {
    const elementsFromDOM =
      (patterns?.length && window.document.querySelectorAll(patterns)) || []

    return { elements: [...elementsFromDOM], error: '' }
  } catch {
    return {
      elements: [],
      error: domMessages.noElementsFound
    }
  }
}

export const getElements = ({ patterns, defaultElements, filter }) => {
  return new Promise((resolve) => {
    const { elements, error } = getElementsFromDOM(patterns)
    let elementsFound = [...elements, ...defaultElements]

    if (filter) {
      elementsFound = elementsFound.filter(filter)
    }

    resolve({ elements: elementsFound, error })
  })
}

export const getActionType = () => {
  return actionTypes.GET_DOM_ELEMENTS
}
