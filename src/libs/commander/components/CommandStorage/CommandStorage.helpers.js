import React from 'react'
import { Tree } from '../Tree/Tree.component'
import { storageActionTypes } from './CommandStorage.constants'

export const getActionType = ({ local }) => {
  if (local) return storageActionTypes.SHOW_LOCAL_STORAGE
  return storageActionTypes.NONE
}

export const evaluateStringifiedValue = (value) => {
  if (typeof value !== 'string') return value

  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

export const turnStorageToTableItems = ({ storage = {} }) => {
  return Object.entries(storage).map(([key, value]) => {
    return [key, value]
  })
}

export const parseValue = (value) => (
  <Tree content={evaluateStringifiedValue(value)} />
)
