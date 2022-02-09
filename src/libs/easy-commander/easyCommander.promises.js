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
