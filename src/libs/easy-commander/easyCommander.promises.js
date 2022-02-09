export const getElements = ({ patterns, defaultElements }) => {
  return new Promise((resolve) => {
    const newElements = patterns.reduce((allElements, pattern) => {
      const foundElements = pattern
        ? window.document.querySelectorAll(pattern)
        : []

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
