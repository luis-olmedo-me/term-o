import { checkIfRegExpIsValid } from 'libs/commander/components/CommandOn/CommandOn.helpers'

export const isElementHidden = (element, bounds) => {
  const { height, width } = bounds || element.getBoundingClientRect()

  return (
    element.style.visibility === 'hidden' ||
    element.style.display === 'none' ||
    height === 0 ||
    width === 0
  )
}

export const isObjectFilterValidRegex = filter => {
  return Object.entries(filter).every(([key, value]) => {
    return checkIfRegExpIsValid(key) && checkIfRegExpIsValid(value)
  })
}
