import React from 'react'
import { Tree } from '../Tree/Tree.component'
import { storageActionTypes } from './CommandStorage.constants'

export const getActionType = ({ local }) => {
  if (local) return storageActionTypes.LOCAL_STORAGE
  return storageActionTypes.NONE
}

const evaluateStorage = ({ storage = {} }) => {
  return Object.entries(storage).reduce((evaluatedStorage, [key, value]) => {
    const isValueStringifiedObject =
      typeof value === 'string' && value.startsWith('{') && value.endsWith('}')
    const isValueStringifiedArray =
      typeof value === 'string' && value.startsWith('[') && value.endsWith(']')

    return {
      ...evaluatedStorage,
      [key]:
        isValueStringifiedObject || isValueStringifiedArray
          ? JSON.parse(value)
          : value
    }
  }, {})
}

export const turnStorageToTableItems = ({ storage = {} }) => {
  const parsedStorage = evaluateStorage({ storage })

  return Object.keys(parsedStorage).map((key) => {
    const values = parsedStorage[key]
    return [key, <Tree content={values} />]
  })
}
