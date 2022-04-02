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

export const getElements = ({
  patterns,
  defaultElements,
  filterBySome,
  filterByEvery
}) => {
  return new Promise((resolve, reject) => {
    const elements = getElementsFromDOM(patterns)

    const elementsFoundByEvery = filterByEvery
      ? [...elements, ...defaultElements].filter(filterByEvery)
      : [...elements, ...defaultElements]

    console.log('elementsFoundByEvery', elementsFoundByEvery)

    const elementsFoundBySome = filterBySome
      ? elementsFoundByEvery.filter(filterBySome)
      : elementsFoundByEvery

    console.log('elementsFoundBySome', elementsFoundBySome)

    if (!elementsFoundBySome.length) reject()
    else resolve({ elementsFound: elementsFoundBySome })
  })
}

export const getActionType = () => {
  return actionTypes.GET_DOM_ELEMENTS
}

export const isElementHidden = (element, bounds) => {
  const { height, width } = bounds || element.getBoundingClientRect()

  return (
    element.style.visibility === 'hidden' ||
    element.style.display === 'none' ||
    height === 0 ||
    width === 0
  )
}
