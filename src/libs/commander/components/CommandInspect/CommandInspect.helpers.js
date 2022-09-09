import { getElements } from '../CommandDom/CommandDom.helpers'
import { inspectActionTypes } from './CommandInspect.constants'

export const getActionType = () => {
  return inspectActionTypes.INSPECT
}

export const getDefaultHTMlRoot = () => {
  const elementsSearch = getElements({
    patterns: ['html'],
    filterBySome: null,
    filterByEvery: null
  })

  return elementsSearch
}

const removeDuplicatedFromArray = (array) => {
  return [...new Set(array)]
}
const getOpenNodesFromObjetive = (objetive) => {
  let openNodes = []
  let currentObjetive = objetive

  while (currentObjetive) {
    openNodes = [...openNodes, currentObjetive]
    currentObjetive = currentObjetive.parentElement
  }

  return openNodes
}
export const getOpenNodesFromObjetives = (objetives) => {
  const openNodes = objetives.reduce((allOpenNodes, objetive) => {
    return [...allOpenNodes, ...getOpenNodesFromObjetive(objetive)]
  }, [])

  return removeDuplicatedFromArray(openNodes)
}
