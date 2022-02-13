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

export const kebabize = (string) => {
  return string
    .split('')
    .map((letter, index) => {
      return letter.toUpperCase() === letter
        ? `${index !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter
    })
    .join('')
}

export const camelize = (string) =>
  string.replace(/-./g, ([_, secondLetter]) => secondLetter.toUpperCase())

const divElement = document.createElement('div')
export const validStyleKeys = Object.keys(divElement.style)

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
