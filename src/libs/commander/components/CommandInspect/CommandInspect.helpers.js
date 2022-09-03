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
