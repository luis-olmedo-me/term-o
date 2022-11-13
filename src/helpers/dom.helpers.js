export const isElementHidden = (element, bounds) => {
  const { height, width } = bounds || element.getBoundingClientRect()

  return (
    element.style.visibility === 'hidden' ||
    element.style.display === 'none' ||
    height === 0 ||
    width === 0
  )
}
