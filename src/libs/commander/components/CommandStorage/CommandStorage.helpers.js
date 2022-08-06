import React from 'react'
import { storageActionTypes } from './CommandStorage.constants'
import { MaterialTree } from './CommandStorage.styles'

export const getActionType = ({ local, cookies, session }) => {
  if (local) return storageActionTypes.SHOW_LOCAL_STORAGE
  else if (session) return storageActionTypes.SHOW_SESSION_STORAGE
  else if (cookies) return storageActionTypes.SHOW_COOKIES
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

export const parseTableValuesForLocalStoageItems = (row, columnIndex) => {
  const isValueRow = columnIndex === 1
  const [key, value] = row
  const currentValue = row[columnIndex]

  return isValueRow ? (
    <MaterialTree
      content={evaluateStringifiedValue(value)}
      isKeyEditionEnabled
      isValueEditionEnabled
      handleChange={(newValue) => {
        console.log(key, newValue)
      }}
    />
  ) : (
    currentValue
  )
}

export const parseCookies = (cookies) => {
  if (!cookies) return {}

  return cookies.split('; ').reduce((parsedCookies, cookie) => {
    const [key, value] = cookie.split('=')

    return { ...parsedCookies, [key]: value }
  }, {})
}
