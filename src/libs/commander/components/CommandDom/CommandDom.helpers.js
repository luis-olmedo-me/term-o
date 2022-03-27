import { actionTypes } from '../../constants/commands.constants'

const getElementsFromDOM = (patterns) => {
  try {
    const elementsFromDOM =
      (patterns?.length && window.document.querySelectorAll(patterns)) || []

    return [...elementsFromDOM]
  } catch {
    return []
  }
}

export const getElements = ({ patterns, defaultElements, filter }) => {
  return new Promise((resolve, reject) => {
    const elements = getElementsFromDOM(patterns)
    const elementsFound = filter
      ? [...elements, ...defaultElements].filter(filter)
      : [...elements, ...defaultElements]

    if (!elementsFound.length) reject()
    else resolve({ elementsFound })
  })
}

export const getActionType = () => {
  return actionTypes.GET_DOM_ELEMENTS
}
