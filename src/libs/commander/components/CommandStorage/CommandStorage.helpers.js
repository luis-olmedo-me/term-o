import * as React from 'preact'

import { Copy, Pencil } from '@src/modules/icons'
import { storageActionTypes } from './CommandStorage.constants'

export const getActionType = ({ local, cookies, session }) => {
  if (local) return storageActionTypes.SHOW_LOCAL_STORAGE
  else if (session) return storageActionTypes.SHOW_SESSION_STORAGE
  else if (cookies) return storageActionTypes.SHOW_COOKIES
  return storageActionTypes.NONE
}

export const evaluateStringifiedValue = value => {
  if (typeof value !== 'string') return value

  try {
    return JSON.stringify(JSON.parse(value), null, 2)
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

export const parseCookies = cookies => {
  if (!cookies) return {}

  return cookies.split('; ').reduce((parsedCookies, cookie) => {
    const [key, value] = cookie.split('=')

    return { ...parsedCookies, [key]: value }
  }, {})
}

export const parseEntity = entity => {
  try {
    const isObject = JSON.parse(entity)

    return isObject ? JSON.stringify(entity, null, 2) : entity
  } catch {
    const isNumber = !Number.isNaN(Number(entity))
    const isBoolean = ['true', 'false'].includes(entity)

    return !isNumber || !isBoolean ? `"${entity}"` : entity
  }
}

export const evaluateValue = value => {
  try {
    return JSON.parse(value)
  } catch {
    const isNumber = !Number.isNaN(Number(entity))
    const isBoolean = ['true', 'false'].includes(entity)
    const parsedValue = isNumber || isBoolean ? entity : `"${entity}"`

    return JSON.parse(`{value:${parsedValue}}`).value
  }
}
