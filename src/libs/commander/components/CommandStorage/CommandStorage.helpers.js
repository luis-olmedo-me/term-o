import { Copy, Pencil } from '@src/modules/icons'
import * as React from 'preact'
import { storageActionTypes } from './CommandStorage.constants'
import { MaterialTree } from './CommandStorage.styles'

export const getActionType = ({ local, cookies, session }) => {
  if (local) return storageActionTypes.SHOW_LOCAL_STORAGE
  else if (session) return storageActionTypes.SHOW_SESSION_STORAGE
  else if (cookies) return storageActionTypes.SHOW_COOKIES
  return storageActionTypes.NONE
}

export const evaluateStringifiedValue = value => {
  if (typeof value !== 'string') return value

  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

export const turnStorageToTableItems = ({ storage = {}, editValue }) => {
  return Object.entries(storage).map(([key, value]) => {
    return [
      {
        value: key,
        actions: [
          {
            id: 'copy-value',
            title: 'Copy value',
            onClick: () => navigator.clipboard.writeText(value),
            Component: <Copy />
          }
        ]
      },
      {
        value,
        actions: [
          {
            id: 'copy-value',
            title: 'Copy value',
            onClick: () => navigator.clipboard.writeText(value),
            Component: <Copy />
          },
          {
            id: 'edit-element',
            title: 'Edit',
            onClick: () => editValue([key, value]),
            Component: <Pencil />
          }
        ]
      }
    ]
  })
}

export const parseTableValuesForLocalStoageItems = (row, columnIndex, onChange) => {
  const isValueRow = columnIndex === 1
  const [key, value] = row
  const currentValue = row[columnIndex]

  return isValueRow ? (
    <MaterialTree
      content={evaluateStringifiedValue(value)}
      isKeyEditionEnabled
      isValueEditionEnabled
      handleChange={newValue => onChange({ key, newValue })}
    />
  ) : (
    currentValue
  )
}

export const getParseTableValuesForLocalStoageItems = onChange => {
  return (row, columnIndex) => parseTableValuesForLocalStoageItems(row, columnIndex, onChange)
}

export const parseCookies = cookies => {
  if (!cookies) return {}

  return cookies.split('; ').reduce((parsedCookies, cookie) => {
    const [key, value] = cookie.split('=')

    return { ...parsedCookies, [key]: value }
  }, {})
}
