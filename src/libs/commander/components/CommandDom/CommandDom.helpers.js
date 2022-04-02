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

    const elementsFoundBySome = filterBySome
      ? elementsFoundByEvery.filter(filterBySome)
      : elementsFoundByEvery

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

export const generateFilterBySome = ({
  hasId,
  hasClass,
  byId,
  byClass,
  byText,
  byStyle,
  byAttribute
}) => {
  return (element) => {
    let validations = []

    if (hasId) validations.push((element) => Boolean(element.id))
    if (hasClass) validations.push((element) => Boolean(element.className))
    if (byId.length) {
      validations.push((element) => byId.some((id) => element.id.includes(id)))
    }
    if (byClass.length) {
      validations.push((element) =>
        byClass.some((className) => element.className?.includes?.(className))
      )
    }
    if (byText.length) {
      validations.push((element) =>
        byText.some((text) => element.textContent?.includes?.(text))
      )
    }
    if (byStyle.length) {
      validations.push((element) =>
        byStyle.some((style) => {
          const [[styleName, styleValue]] = Object.entries(style)

          return element.style[styleName] === styleValue
        })
      )
    }
    if (byAttribute.length) {
      validations.push((element) =>
        byAttribute.some((attribute) => {
          const [[attributeName, attributeValue]] = Object.entries(attribute)

          return element.getAttribute(attributeName)?.includes(attributeValue)
        })
      )
    }

    return validations.some((validation) => validation(element))
  }
}

export const generateFilterByEvery = ({ hidden }) => {
  return (element) => {
    let validations = []

    if (!hidden) validations.push((element) => !isElementHidden(element))

    return validations.every((validation) => validation(element))
  }
}
