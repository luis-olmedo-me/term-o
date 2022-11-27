import * as React from 'preact'

import { Copy } from '@src/modules/icons'
import {
  eventActionTypes,
  inputsChangeTrigerables,
  inputTypeChangeTrigerables,
  internalEventTableOptions
} from './CommandEvent.constants'

export const getActionType = ({ list, delete: deletedIds, trigger, listeners }) => {
  if (trigger) return eventActionTypes.TRIGGER
  else if (deletedIds.length) return eventActionTypes.DELETE_EVENT
  else if (listeners) return eventActionTypes.SHOW_LISTENERS_LIST
  else if (list) return eventActionTypes.SHOW_LIST
  else return eventActionTypes.NONE
}

export const turnPageEventsToTableItems = ({ pageEvents }) => {
  return pageEvents.map(pageEvent => {
    return internalEventTableOptions.columns.map(({ id }) => {
      const rowValue = pageEvent[id]

      return {
        value: rowValue,
        actions: [
          {
            id: 'copy-value',
            title: 'Copy value',
            onClick: () => navigator.clipboard.writeText(rowValue),
            Component: <Copy />
          }
        ]
      }
    })
  })
}

export const triggerChangeEvent = ({ element, value }) => {
  const inputType = element.getAttribute('type')

  switch (inputType) {
    case 'checkbox':
    case 'radio':
      element.checked = value === '' ? !element.checked : value === 'true'
      break

    default:
      element.value = value
      break
  }

  element.dispatchEvent(new Event('change'))
}

export const validateElement = element => {
  const isValidInput = inputsChangeTrigerables.includes(element.tagName)
  const isInput = element.tagName === 'INPUT'
  const type = element.getAttribute('type')

  return isValidInput && (isInput ? inputTypeChangeTrigerables.includes(type) : true)
}
