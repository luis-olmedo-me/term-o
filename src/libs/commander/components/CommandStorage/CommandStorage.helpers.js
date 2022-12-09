import * as React from 'preact'

import { Pencil } from '@src/modules/icons'
import { storageActionTypes, storageCellActionIds } from './CommandStorage.constants'

export const getActionType = ({ local, cookies, session }) => {
  if (local) return storageActionTypes.SHOW_LOCAL_STORAGE
  else if (session) return storageActionTypes.SHOW_SESSION_STORAGE
  else if (cookies) return storageActionTypes.SHOW_COOKIES
  return storageActionTypes.NONE
}

export const turnStorageToTableItems = ({ storage = {}, editValue }) => {
  return Object.entries(storage).map(([storageKey, storageValue]) => {
    return { storageKey, storageValue }
  })
}

export const createCellActions = ({ editValue }) => {
  return [
    {
      id: storageCellActionIds.EDIT_VALUE,
      title: 'Edit',
      onClick: ({ row }) => editValue([row.storageKey, row.storageValue]),
      Component: <Pencil />
    }
  ]
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
    const object = JSON.parse(entity)

    return object ? JSON.stringify(object, null, 2) : entity
  } catch {
    const isNumber = !Number.isNaN(Number(entity))
    const isBoolean = ['true', 'false'].includes(entity)

    return !isNumber || !isBoolean ? `"${entity}"` : entity
  }
}
