const getElementsFromDOM = (patterns) => {
  try {
    const elementsFromDOM =
      (patterns?.length && window.document.querySelectorAll(patterns)) || []

    return { elements: [...elementsFromDOM], error: '' }
  } catch (error) {
    return { elements: [], error: 'errorsinio' }
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

export const styleElements = ({ styles, elements }) => {
  return new Promise((resolve) => {
    elements.forEach((element) => {
      Object.entries(styles).forEach(([key, value]) => {
        element.style[key] = value
      })
    })

    resolve(elements)
  })
}
