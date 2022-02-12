const getElementsFromDOM = (patterns) => {
  try {
    const elementsFromDOM =
      (patterns?.length && window.document.querySelectorAll(patterns)) || []

    return { elements: [...elementsFromDOM], error: '' }
  } catch {
    const stringifiedPatterns = patterns.join(', ')

    return {
      elements: [],
      error: `No elements where found in DOM for: "${stringifiedPatterns}".`
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

const divElement = document.createElement('div')
export const validStyleKeys = Object.keys(divElement.style)
console.log('validStyleKeys', validStyleKeys)

export const validateStyles = (styles) => {
  let invalidStyles = {}
  let validStyles = {}

  for (const styleKey in styles) {
    const styleValue = styles[styleKey]

    if (validStyleKeys.includes(styleKey)) {
      validStyles = { ...validStyles, [styleKey]: styleValue }
    } else {
      invalidStyles = { ...invalidStyles, [styleKey]: styleValue }
    }
  }

  return { validStyles, invalidStyles }
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
