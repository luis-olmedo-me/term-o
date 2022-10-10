import { eventActionTypes, eventRows } from './CommandEvent.constants'

export const getActionType = ({ list, delete: deletedIds, trigger }) => {
  if (trigger) return eventActionTypes.TRIGGER
  else if (deletedIds.length) return eventActionTypes.DELETE_EVENT
  else if (list) return eventActionTypes.SHOW_LIST
  else return eventActionTypes.NONE
}

export const turnPageEventsToTableItems = ({ pageEvents }) => {
  return pageEvents.map((pageEvent) => {
    return eventRows.map((eventRow) => {
      const rowValue = pageEvent[eventRow]

      return {
        value: rowValue,
        actions: [
          {
            id: 'copy-value',
            title: 'Copy value',
            onClick: () => navigator.clipboard.writeText(rowValue),
            Component: '📋'
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
