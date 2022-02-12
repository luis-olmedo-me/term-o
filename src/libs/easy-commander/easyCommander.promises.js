const getElementsFromDOM = (pattern) => {
  try {
    const elementsFromDOM =
      (pattern && window.document.querySelectorAll(pattern)) || []

    return [...elementsFromDOM]
  } catch (error) {
    return []
  }
}

export const getElements = ({ patterns, defaultElements, filter }) => {
  return new Promise((resolve) => {
    const newElements = patterns.reduce((allElements, pattern) => {
      let foundElements = getElementsFromDOM(pattern)

      if (filter) {
        foundElements = foundElements.filter(filter)
      }

      return [...allElements, ...foundElements]
    }, defaultElements)

    resolve(newElements)
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
