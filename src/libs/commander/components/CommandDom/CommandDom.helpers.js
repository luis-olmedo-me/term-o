import { getAttributes, getStyles, isElementHidden } from '@src/helpers/dom.helpers'
import { removeDuplicatedFromArray } from '@src/helpers/utils.helpers.js'
import { actionTypes } from '../../constants/commands.constants'

const getElementsFromDOM = patterns => {
  try {
    const elementsFromDOM = (patterns?.length && window.document.querySelectorAll(patterns)) || []

    return [...elementsFromDOM]
  } catch {
    return []
  }
}

export const getElements = ({ patterns, xpaths, filterBySome, filterByEvery }) => {
  return new Promise((resolve, reject) => {
    const elements = xpaths?.length
      ? xpaths.map(lookupElementByXPath)
      : getElementsFromDOM(patterns)

    const elementsFoundByEvery = filterByEvery ? elements.filter(filterByEvery) : elements

    const elementsFoundBySome = filterBySome
      ? elementsFoundByEvery.filter(filterBySome)
      : elementsFoundByEvery

    if (!elementsFoundBySome.length) reject(new Error('noElementsFound'))
    else resolve({ elementsFound: elementsFoundBySome })
  })
}

export const getActionType = ({ get }) => {
  if (get.length) return actionTypes.GET_DOM_ELEMENTS
  else return actionTypes.NONE
}

export const generateFilterBySome = ({
  hasId,
  hasClass,
  byId,
  byClass,
  byText,
  byStyle,
  byAttr
}) => {
  return element => {
    let validations = []

    if (hasId) validations.push(element => Boolean(element.id))
    if (hasClass) validations.push(element => Boolean(element.className))
    if (byId.length) {
      validations.push(element => byId.some(id => element.id.includes(id)))
    }
    if (byClass.length) {
      validations.push(element =>
        byClass.some(className => element.className?.includes?.(className))
      )
    }
    if (byText.length) {
      validations.push(element =>
        byText.some(rawText => {
          const text = rawText.toLowerCase()

          const hasTextMatch = Array.from(element.childNodes).some(child => {
            const isTextNode = child.nodeType === 3
            const isTextMatch = !!child?.data?.toLowerCase().includes(text)

            return isTextMatch && isTextNode
          })

          const hasValueMatch = element.value?.toLowerCase?.().includes(text)

          return hasTextMatch || hasValueMatch
        })
      )
    }
    if (Object.keys(byStyle).length) {
      validations.push(element =>
        Object.entries(byStyle).some(([styleNamePattern, styleValuePattern]) => {
          const styleNameRegex = new RegExp(styleNamePattern)
          const styleValueRegex = new RegExp(styleValuePattern)
          const elementStyles = getStyles(element)

          const matchesStyleName = Object.keys(elementStyles).some(styleName =>
            styleNameRegex.test(styleName)
          )
          const matchesStyleValue = Object.values(elementStyles).some(styleValue =>
            styleValueRegex.test(styleValue)
          )

          return matchesStyleName && matchesStyleValue
        })
      )
    }
    if (Object.keys(byAttr).length) {
      validations.push(element =>
        Object.entries(byAttr).some(([attrNamePattern, attrValuePattern]) => {
          const attrNameRegex = new RegExp(attrNamePattern)
          const attrValueRegex = new RegExp(attrValuePattern)
          const elementAttrs = getAttributes(element)

          if (typeof attrValuePattern === 'boolean') {
            const matchAttrNames = Object.keys(elementAttrs).filter(attrName =>
              attrNameRegex.test(attrName)
            )

            return attrValuePattern
              ? matchAttrNames.some(name => elementAttrs[name] === '')
              : matchAttrNames.some(name => elementAttrs[name] !== '')
          }

          const matchesAttrName = Object.keys(elementAttrs).some(attrName =>
            attrNameRegex.test(attrName)
          )
          const matchesAttrValue = Object.values(elementAttrs).some(attrValue =>
            attrValueRegex.test(attrValue)
          )

          return matchesAttrName && matchesAttrValue
        })
      )
    }

    return validations.some(validation => validation(element))
  }
}

export const generateFilterByEvery = ({ hidden }) => {
  return element => {
    let validations = []

    if (!hidden) validations.push(element => !isElementHidden(element))

    return validations.every(validation => validation(element))
  }
}

export const lookupElementByXPath = xpath => {
  const evaluator = new XPathEvaluator()
  const result = evaluator.evaluate(
    xpath,
    document.documentElement,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  )

  return result.singleNodeValue
}

export const getParentsOfElements = (elements, times) => {
  const parents = elements.reduce((parents, element) => {
    return element.parentElement ? [...parents, element.parentElement] : parents
  }, [])

  const unrepeatedParents = removeDuplicatedFromArray(parents)

  return times !== 1 ? getParentsOfElements(unrepeatedParents, times - 1) : unrepeatedParents
}
